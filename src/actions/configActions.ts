import { Store } from "../store";

export type ConfigAction =
    {
        type: "SET_CONFIG",
        config: Store.Config
    } |
    {
        type: "SET_SEARCH_CALLBACK",
        searchCallback: (state: Store.SearchState, postBody: { [key: string]: any }) => Promise<any>,
    } |
    {
        type: "SET_SUGGEST_CALLBACK",
        suggestCallback: (state: Store.SearchState, postBody: { [key: string]: any }) => Promise<any>,
    };

export const setConfig = (config: Store.Config): ConfigAction => ({
    type: "SET_CONFIG",
    config
});

export const setSearchCallback = (searchCallback: (state: Store.SearchState, postBody: { [key: string]: any }) => Promise<any>) => ({
    type: "SET_SEARCH_CALLBACK",
    searchCallback
});

export const setSuggestCallback = (suggestCallback: (state: Store.SearchState, postBody: { [key: string]: any }) => Promise<any>) => ({
    type: "SET_SUGGEST_CALLBACK",
    suggestCallback
});