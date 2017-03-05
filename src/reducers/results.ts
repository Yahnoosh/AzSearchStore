import { ResultsAction } from "../actions/resultsActions";
import { Store } from "../store";
import { combineReducers } from "redux";
import * as objectAssign from "object-assign";

export const initialState: Store.SearchResults = {
    count: -1,
    isFetching: false,
    lastUpdated: 0,
    results: []
};

export function results(state: Store.SearchResults = initialState, action: ResultsAction): Store.SearchResults {
    switch (action.type) {
        case "INITIATE_SEARCH":
            return objectAssign({}, state, { isFetching: true });
        case "RECEIVE_RESULTS":
            return objectAssign({}, state, { isFetching: false, lastUpdated: action.receivedAt, results: action.results, count: action.count });
        case "APPEND_RESULTS":
            const results = state.results.concat(action.results);
            return objectAssign({}, state, { isFetching: false, lastUpdated: action.receivedAt, results });
        default:
            return state;
    }
}