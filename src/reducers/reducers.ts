import { ConfigAction } from "../actions/configActions";
import { Store } from "../store";
import { combineReducers, Action } from "redux";
import { config } from "./config";
import { results } from "./results";
import { parameters } from "./parameters";
import { facets } from "./facets";
import { suggestions } from "./suggestions";

export const reducers = combineReducers<Store.SearchState>({
    config,
    results,
    parameters,
    facets,
    suggestions
});