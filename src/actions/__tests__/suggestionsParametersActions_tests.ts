import * as suggestionsParametersActions from "../suggestionsParametersActions";
import { Store } from "../../store";
import * as suggestionsParameters from "../../reducers/suggestionsParameters";

describe("actions/suggestionsParameters", () => {
    it("should create action to set api version", () => {
        expect(
            suggestionsParametersActions.setSuggestionsApiVersion("2015-02-28-Preview")
        ).toEqual({
            type: "SET_SUGGESTIONS_APIVERSION",
            apiVersion: "2015-02-28-Preview"
        });
    });
    it("should create action to set all suggestions parameters", () => {
        expect(
            suggestionsParametersActions.setSuggestionsParameters(suggestionsParameters.initialState)
        ).toEqual({
            type: "SET_SUGGESTIONS_PARAMETERS",
            parameters: suggestionsParameters.initialState
        });
    });
    it("should create action to update suggestions parameters", () => {
        expect(
            suggestionsParametersActions.updateSuggestionsParameters(suggestionsParameters.initialState)
        ).toEqual({
            type: "UPDATE_SUGGESTIONS_PARAMETERS",
            parameters: suggestionsParameters.initialState
        });
    });
});