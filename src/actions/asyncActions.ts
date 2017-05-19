import { Store } from "../store";
import * as resultsActions from "./resultsActions";
import * as suggestionsActions from "./suggestionsActions";
import * as facetsActions from "./facetsActions";
import * as promise from "es6-promise";
import "isomorphic-fetch";
import { buildSearchURI, buildSuggestionsURI, buildPostBody, suggestParameterValidator, searchParameterValidator } from "../utils/uriHelper";
// todo this should probably be at the entry point of app
promise.polyfill();
import thunk, { ThunkAction } from "redux-thunk";

const userAgent = "AzSearchStore/Preview";

const searchAndDispatch: ThunkAction<Promise<void>, Store.SearchState, {
    resultsActionToDispatch: (results: {}[], recievedAt: number, count?: number) => resultsActions.ResultsAction,
    facetsActionToDispatch: (facets: { [key: string]: Store.FacetResult[] }) => facetsActions.FacetsAction
}> =
    (dispatch, getState, {resultsActionToDispatch, facetsActionToDispatch}) => {
        const searchState: Store.SearchState = getState();
        const service = searchState.config.service;
        const index = searchState.config.index;
        const parameters = searchState.parameters;
        const searchCallback = searchState.config.searchCallback;
        const searchURI = buildSearchURI(searchState.config, parameters);
        const postBody = buildPostBody(parameters.searchParameters, parameters.input, searchParameterValidator, searchState.facets);
        let headers = new Headers({
            "api-key": searchState.config.queryKey,
            "Content-Type": "application/json",
            "User-Agent": userAgent,
            "x-ms-client-user-agent": userAgent
        });
        dispatch(resultsActions.initiateSearch());
        const promise = searchCallback ? searchCallback(searchState, postBody) :
            fetch(searchURI, {
                mode: "cors",
                headers,
                method: "POST",
                body: JSON.stringify(postBody)
            });
        return promise.then(response => response.json())
            .then(json => {
                const results: {}[] = json["value"];
                let count: number = json["@odata.count"];
                count = count >= 0 ? count : -1;
                dispatch(resultsActionToDispatch(results, Date.now(), count));
                const facets: { [key: string]: Store.FacetResult[] } = json["@search.facets"];
                if (facetsActionToDispatch) {
                    dispatch(facetsActionToDispatch(facets));
                }
            })
            .catch(error => {
                dispatch(resultsActions.handleSearchError(error.message));
            });
    };

export const fetchSearchResults: ThunkAction<Promise<void>, Store.SearchState, {}> = (dispatch, getState) => {
    return searchAndDispatch(dispatch, getState, { resultsActionToDispatch: resultsActions.recieveResults, facetsActionToDispatch: facetsActions.setFacetsValues });
};

export const loadMoreSearchResults: ThunkAction<Promise<void>, Store.SearchState, {}> = (dispatch, getState) => {
    return searchAndDispatch(dispatch, getState, { resultsActionToDispatch: resultsActions.appendResults, facetsActionToDispatch: null });
};

export const fetchSearchResultsFromFacet: ThunkAction<Promise<void>, Store.SearchState, {}> = (dispatch, getState) => {
    return searchAndDispatch(dispatch, getState, { resultsActionToDispatch: resultsActions.recieveResults, facetsActionToDispatch: facetsActions.updateFacetsValues });
};

export const suggest: ThunkAction<Promise<void>, Store.SearchState, {}> =
    (dispatch, getState) => {
        const searchState: Store.SearchState = getState();
        const service = searchState.config.service;
        const index = searchState.config.index;
        const suggestCallBack = searchState.config.suggestCallback;
        const parameters = searchState.parameters;
        const suggestURI = buildSuggestionsURI(searchState.config, searchState.parameters);
        const postBody = buildPostBody(parameters.suggestionsParameters, parameters.input, suggestParameterValidator);
        let headers = new Headers({
            "api-key": searchState.config.queryKey,
            "Content-Type": "application/json",
            "User-Agent": userAgent,
            "x-ms-client-user-agent": userAgent
        });
        dispatch(suggestionsActions.initiateSuggest());
        const promise = suggestCallBack ? suggestCallBack(searchState, postBody) :
            fetch(suggestURI,
                {
                    mode: "cors",
                    headers,
                    method: "POST",
                    body: JSON.stringify(postBody)
                });
        return promise.then(response => response.json())
            .then(json => {
                const suggestions: {}[] = json["value"];
                dispatch(suggestionsActions.recieveSuggestions(suggestions, Date.now()));
            })
            .catch(error => {
                dispatch(suggestionsActions.handleSuggestError(error.message));
            });
    };