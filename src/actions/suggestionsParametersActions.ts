import { Store } from "../store";

export type SuggestionsParametersAction =
    {
        type: "SET_SUGGESTIONS_APIVERSION",
        apiVersion: Store.SearchApiVersion
    } |
    {
        type: "SET_SUGGESTIONS_PARAMETERS",
        parameters: Store.SuggestionsParameters
    } |
    {
        type: "UPDATE_SUGGESTIONS_PARAMETERS",
        parameters: Store.SuggestionsParametersUpdate
    };

export const setSuggestionsApiVersion = (apiVersion: Store.SearchApiVersion): SuggestionsParametersAction => ({
    type: "SET_SUGGESTIONS_APIVERSION",
    apiVersion
});

export const setSuggestionsParameters = (parameters: Store.SuggestionsParameters): SuggestionsParametersAction => ({
    type: "SET_SUGGESTIONS_PARAMETERS",
    parameters
});

export const updateSuggestionsParameters = (parameters: Store.SuggestionsParametersUpdate): SuggestionsParametersAction => ({
    type: "UPDATE_SUGGESTIONS_PARAMETERS",
    parameters
});