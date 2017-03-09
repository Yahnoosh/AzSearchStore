import { SuggestionsParametersAction } from "../actions/suggestionsParametersActions";
import { Store } from "../store";
import { updateObject } from "./reducerUtils";

export const initialState: Store.SuggestionsParameters = {
    orderby: null,
    searchFields: null,
    select: null,
    top: 5,
    apiVersion: "2016-09-01",
    filter: null,
    fuzzy: false,
    highlightPostTag: null,
    highlightPreTag: null,
    suggesterName: null
};

export function suggestionsParameters(state: Store.SuggestionsParameters = initialState, action: SuggestionsParametersAction): Store.SuggestionsParameters {
    switch (action.type) {
        case "SET_SUGGESTIONS_APIVERSION":
            return updateObject(state, { apiVersion: action.apiVersion });
        case "SET_SUGGESTIONS_PARAMETERS":
            return action.parameters;
        case "UPDATE_SUGGESTIONS_PARAMETERS":
            return updateObject(state, action.parameters);
        default:
            return state;
    }
}