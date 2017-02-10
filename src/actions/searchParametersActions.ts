import { Store } from "../store";

export type SearchParametersAction =
    {
        type: "SET_INPUT"
        input: string
    } |
    {
        type: "SET_APIVERSION",
        apiVersion: Store.SearchApiVersion
    } |
    {
        type: "SET_PARAMETERS",
        parameters: Store.SearchParameters
    } |
    {
        type: "INCREMENT_SKIP",
    } |
    {
        type: "DECREMENT_SKIP"
    };

export const setInput = (input: string): SearchParametersAction => ({
    type: "SET_INPUT",
    input
});

export const setApiVersion = (apiVersion: Store.SearchApiVersion): SearchParametersAction => ({
    type: "SET_APIVERSION",
    apiVersion
});

export const setParameters = (parameters: Store.SearchParameters): SearchParametersAction => ({
    type: "SET_PARAMETERS",
    parameters
});

export const incrementsSkip = (): SearchParametersAction => ({
    type: "INCREMENT_SKIP",
});

export const decrementSkip = (): SearchParametersAction => ({
    type: "DECREMENT_SKIP",
});