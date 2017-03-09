import { Store } from "../store";
import * as resultsActions from "./resultsActions";
import * as suggestionsActions from "./suggestionsActions";
import * as facetsActions from "./facetsActions";
import * as promise from "es6-promise";
import { buildSearchURI, buildSuggestionsURI, buildSuggestionsPostBody } from "../utils/uriHelper";
// todo this should probably be at the entry point of app
promise.polyfill();
import * as fetch from "isomorphic-fetch";
import thunk, { ThunkAction } from "redux-thunk";


const searchAndDispatch: ThunkAction<Promise<void>, Store.SearchState, {
    resultsActionToDispatch: (results: {}[], recievedAt: number, count?: number) => resultsActions.ResultsAction,
    facetsActionToDispatch: (facets: { [key: string]: Store.FacetResult[] }) => facetsActions.FacetsAction
}> =
    (dispatch, getState, {resultsActionToDispatch, facetsActionToDispatch}) => {
        const searchState: Store.SearchState = getState();
        const service = searchState.config.service;
        const index = searchState.config.index;
        const searchURI = buildSearchURI(searchState.config, searchState.parameters, searchState.facets);
        let headers = new Headers({ "api-key": searchState.config.queryKey });
        dispatch(resultsActions.initiateSearch());
        return fetch(searchURI, { mode: "cors", headers })
            .then(response => response.json())
            .then(json => {
                const results: {}[] = json.value;
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
        const suggestURI = buildSuggestionsURI(searchState.config, searchState.parameters);
        const postBody = buildSuggestionsPostBody(searchState.parameters);
        let headers = new Headers({
            "api-key": searchState.config.queryKey,
            "Content-Type": "application/json"
        });
        dispatch(suggestionsActions.initiateSuggest());
        return fetch(suggestURI,
            {
                mode: "cors",
                headers,
                method: "POST",
                body: JSON.stringify(postBody)
            })
            .then(response => response.json())
            .then(json => {
                const suggestions: {}[] = json.value;
                dispatch(suggestionsActions.recieveSuggestions(suggestions, Date.now()));
            })
            .catch(error => {
                dispatch(suggestionsActions.handleSuggestError(error.message));
            });
    };