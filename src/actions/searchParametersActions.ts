import { Store } from "../store";

export type SearchParametersAction =
    {
        type: "SET_SEARCH_APIVERSION",
        apiVersion: Store.SearchApiVersion
    } |
    {
        type: "SET_SEARCH_PARAMETERS",
        parameters: Store.SearchParameters
    } |
    {
        type: "UPDATE_SEARCH_PARAMETERS",
        parameters: Store.SearchParametersUpdate
    } |
    {
        type: "INCREMENT_SKIP",
    } |
    {
        type: "DECREMENT_SKIP"
    } |
    {
        type: "SET_PAGE",
        page: number
    };

export const setSearchApiVersion = (apiVersion: Store.SearchApiVersion): SearchParametersAction => ({
    type: "SET_SEARCH_APIVERSION",
    apiVersion
});

export const setSearchParameters = (parameters: Store.SearchParameters): SearchParametersAction => ({
    type: "SET_SEARCH_PARAMETERS",
    parameters
});

export const updateSearchParameters = (parameters: Store.SearchParametersUpdate): SearchParametersAction => ({
    type: "UPDATE_SEARCH_PARAMETERS",
    parameters
});

export const incrementSkip = (): SearchParametersAction => ({
    type: "INCREMENT_SKIP",
});

export const decrementSkip = (): SearchParametersAction => ({
    type: "DECREMENT_SKIP",
});

export const setPage = (page: number): SearchParametersAction => ({
    type: "SET_PAGE",
    page
});