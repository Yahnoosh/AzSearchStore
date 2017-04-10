import * as searchParametersActions from "../searchParametersActions";
import { Store } from "../../store";
import * as searchParameters from "../../reducers/searchParameters";

describe("actions/searchParameters", () => {
    it("should create action to set api version", () => {
        expect(
            searchParametersActions.setSearchApiVersion("2015-02-28-Preview")
        ).toEqual({
            type: "SET_SEARCH_APIVERSION",
            apiVersion: "2015-02-28-Preview"
        });
    });
    it("should create action to set all search parameters", () => {
        expect(
            searchParametersActions.setSearchParameters(searchParameters.initialState)
        ).toEqual({
            type: "SET_SEARCH_PARAMETERS",
            parameters: searchParameters.initialState
        });
    });
    it("should create action to update search parameters", () => {
        expect(
            searchParametersActions.updateSearchParameters(searchParameters.initialState)
        ).toEqual({
            type: "UPDATE_SEARCH_PARAMETERS",
            parameters: searchParameters.initialState
        });
    });
    it("should create action to incrememt skip", () => {
        expect(
            searchParametersActions.incrementSkip()
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
    it("should create action to set page number", () => {
        expect(
            searchParametersActions.setPage(5)
        ).toEqual({
            type: "SET_PAGE",
            page: 5
        });
    });
});