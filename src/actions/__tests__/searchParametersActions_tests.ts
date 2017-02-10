import * as searchParametersActions from "../searchParametersActions";
import { Store } from "../../store";
import * as searchParameters from "../../reducers/searchParameters";

describe("actions/sync", () => {
    it("should create action to set input", () => {
        expect(
            searchParametersActions.setInput("foo")
        ).toEqual({
            type: "SET_INPUT",
            input: "foo"
        });
    });
    it("should create action to set api version", () => {
        expect(
            searchParametersActions.setApiVersion("2015-02-28-Preview")
        ).toEqual({
            type: "SET_APIVERSION",
            apiVersion: "2015-02-28-Preview"
        });
    });
    it("should create action to set all parameters", () => {
        expect(
            searchParametersActions.setParameters(searchParameters.initialState)
        ).toEqual({
            type: "SET_PARAMETERS",
            parameters: searchParameters.initialState
        });
    });
    it("should create action to incrememt skip", () => {
        expect(
            searchParametersActions.incrementsSkip()
        ).toEqual({
            type: "INCREMENT_SKIP",
        });
    });
    it("should create action to decrement skip", () => {
        expect(
            searchParametersActions.decrementSkip()
        ).toEqual({
            type: "DECREMENT_SKIP"
        });
    });
});