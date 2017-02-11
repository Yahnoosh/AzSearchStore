import { ConfigAction } from "../actions/configActions";
import { Store } from "../store";
import { combineReducers } from "redux";
import { config } from "./config";
import { results } from "./results";
import { searchParameters } from "./searchParameters";
import { facets } from "./facets";

export const reducers = combineReducers<Store.SearchState>({
    config,
    results,
    searchParameters,
    facets
});