import { ConfigAction } from "../actions/configActions";
import { Store } from "../store";
import { combineReducers } from "redux";
import * as objectAssign from "object-assign";

export const initialState: Store.Config = {
    index: "",
    queryKey: "",
    service: ""
};

export function config(state: Store.Config = initialState, action: ConfigAction): Store.Config {
    switch (action.type) {
        case "SET_CONFIG":
            return action.config;
        default:
            return state;
    }
};