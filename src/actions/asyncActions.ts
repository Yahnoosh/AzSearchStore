import { Store } from "../store";
import * as resultsActions from "./resultsActions";
import * as promise from "es6-promise";
import { buildSearchURI } from "../utils/uriHelper";
// todo this should probably be at the entry point of app
promise.polyfill();
import * as fetch from "isomorphic-fetch";
import thunk, { ThunkAction } from "redux-thunk";


const searchAndDispatch: ThunkAction<Promise<void>, Store.SearchState, {actionToDispatch: (results: {}[], recievedAt: number) => resultsActions.ResultsAction}> = (dispatch, getState, {actionToDispatch}) => {
    const searchState: Store.SearchState = getState();
    const service = searchState.config.service;
    const index = searchState.config.index;
    const searchURI = buildSearchURI(searchState.config, searchState.searchParameters, searchState.facets);
    let headers = new Headers({ "api-key": searchState.config.queryKey });
    dispatch(resultsActions.initiateSearch());
    return fetch(searchURI, { mode: "cors", headers })
        .then(response => response.json())
        .then(json => {
            const results: {}[] = json.value;
            dispatch(actionToDispatch(results, Date.now()));
        })
        .catch(error => {
            dispatch(resultsActions.handleSearchError(error.message));
        });
};

export const fetchSearchResults: ThunkAction<Promise<void>, Store.SearchState, {}> = (dispatch, getState) => {
    return searchAndDispatch(dispatch, getState, {actionToDispatch: resultsActions.recieveResults});
};

export const loadMoreSearchResults: ThunkAction<Promise<void>, Store.SearchState, {}> = (dispatch, getState) => {
    return searchAndDispatch(dispatch, getState, {actionToDispatch: resultsActions.appendResults});
};

