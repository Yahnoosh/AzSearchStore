import { SuggestionsAction } from "../actions/suggestionsActions";
import { Store } from "../store";
import { updateObject } from "./reducerUtils";

export const initialState: Store.Suggestions = {
    isFetching: false,
    lastUpdated: 0,
    suggestions: []
};

export function suggestions(state: Store.Suggestions = initialState, action: SuggestionsAction): Store.Suggestions {
    switch (action.type) {
        case "INITIATE_SUGGEST":
            return updateObject(state, { isFetching: true });
        case "RECEIVE_SUGGESTIONS":
            return updateObject(state, { isFetching: false, lastUpdated: action.receivedAt, suggestions: action.suggestions });
        default:
            return state;
    }
}