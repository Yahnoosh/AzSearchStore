import * as suggestionsParameters from "../suggestionsParameters";
import * as suggestionsParametersActions from "../../actions/suggestionsParametersActions";
import { Store } from "../../store";


const initialState = suggestionsParameters.initialState;

describe("reducers/suggestionsParameters", () => {
    it("should return initial state when given empty input", () => {
        expect(
            suggestionsParameters.suggestionsParameters(<Store.SuggestionsParameters>undefined, <suggestionsParametersActions.SuggestionsParametersAction>{})
        ).toEqual(initialState);
    });
    it("should properly set api version", () => {
        const expectedParams: Store.SuggestionsParameters = {
            orderby: null,
            searchFields: null,
            select: null,
            top: 5,
            apiVersion: "2015-02-28-Preview",
            filter: null,
            fuzzy: false,
            highlightPostTag: null,
            highlightPreTag: null,
            suggesterName: null
        };
        expect(
            suggestionsParameters.suggestionsParameters(initialState, suggestionsParametersActions.setSuggestionsApiVersion("2015-02-28-Preview"))
        ).toEqual(expectedParams);
    });
    it("should properly set all searchParameters", () => {
        const testParameters: Store.SuggestionsParameters = {
            apiVersion: "2015-02-28-Preview",
            orderby: "foobar",
            searchFields: "def",
            select: "hij",
            top: 3,
            filter: "abcdfe",
            fuzzy: true,
            highlightPostTag: "abcdef",
            highlightPreTag: "hijck",
            suggesterName: null
        };
        expect(
            suggestionsParameters.suggestionsParameters(initialState, suggestionsParametersActions.setSuggestionsParameters(testParameters))
        ).toEqual(testParameters);
    });
    it("should properly update subset of suggestionsParameters", () => {
        const testParameters: Store.SuggestionsParametersUpdate = {
            top: 3,
            fuzzy: true
        };
        const expectedParams: Store.SuggestionsParameters = {
            orderby: null,
            searchFields: null,
            select: null,
            top: 3,
            apiVersion: "2016-09-01",
            filter: null,
            fuzzy: true,
            highlightPostTag: null,
            highlightPreTag: null,
            suggesterName: null
        };
        expect(
            suggestionsParameters.suggestionsParameters(initialState, suggestionsParametersActions.updateSuggestionsParameters(testParameters))
        ).toEqual(expectedParams);
    });
});