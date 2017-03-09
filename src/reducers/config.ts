import { ConfigAction } from "../actions/configActions";
import { Store } from "../store";
import { combineReducers } from "redux";
import { updateObject } from "./reducerUtils";

export const initialState: Store.Config = {
    index: "",
    queryKey: "",
    service: ""
};

export function config(state: Store.Config = initialState, action: ConfigAction): Store.Config {
    switch (action.type) {
        case "SET_CONFIG":
            return action.config;
        case "SET_SEARCH_CALLBACK":
            return updateObject(state, { searchCallback: action.searchCallback });
        case "SET_SUGGEST_CALLBACK":
            return updateObject(state, { suggestCallback: action.suggestCallback });
        default:
            return state;
    }
};