import { Store } from "../store";
import { combineReducers, Action } from "redux";
import { input } from "./input";
import { searchParameters } from "./searchParameters";
import { suggestionsParameters } from "./suggestionsParameters";


export const parameters = combineReducers<Store.Parameters>({
    input,
    searchParameters,
    suggestionsParameters
});