import { SearchParametersAction } from "../actions/searchParametersActions";
import { Store } from "../store";
import * as objectAssign from "object-assign";

export const initialState: Store.SearchParameters = {
    input: "*",
    count: false,
    orderBy: null,
    scoringProfile: null,
    searchFields: null,
    select: null,
    skip: 0,
    top: 50,
    apiVersion: "2016-09-01",
    searchMode: "any"
};

export function searchParameters(state: Store.SearchParameters = initialState, action: SearchParametersAction): Store.SearchParameters {
    switch (action.type) {
        case "SET_INPUT":
            return objectAssign({}, state, { input: action.input });
        case "SET_APIVERSION":
            return objectAssign({}, state, { apiVersion: action.apiVersion });
        case "SET_PARAMETERS":
            return action.parameters;
        case "INCREMENT_SKIP":
            return objectAssign({}, state, { skip: state.skip + state.top });
        case "DECREMENT_SKIP":
            let skip = state.skip - state.top;
            skip = skip >= 0 ? skip : 0;
            return objectAssign({}, state, { skip });
        default:
            return state;
    }
}