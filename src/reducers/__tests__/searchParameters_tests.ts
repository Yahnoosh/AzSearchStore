import * as searchParameters from "../searchParameters";
import * as searchParametersActions from "../../actions/searchParametersActions";
import { Store } from "../../store";


const initialState = searchParameters.initialState;

describe("reducers/searchParameters", () => {
    it("should return initial state when given empty input", () => {
        expect(
            searchParameters.searchParameters(<Store.SearchParameters>undefined, <searchParametersActions.SearchParametersAction>{})
        ).toEqual(initialState);
    });
    it("should properly set input", () => {
        expect(
            searchParameters.searchParameters(initialState, searchParametersActions.setInput("foo"))
        ).toEqual({
            input: "foo",
            count: false,
            orderBy: null,
            scoringProfile: null,
            searchFields: null,
            select: null,
            skip: 0,
            top: 50,
            apiVersion: "2016-09-01",
            searchMode: "any"
        });
    });
    it("should properly set api version", () => {
        expect(
            searchParameters.searchParameters(initialState, searchParametersActions.setApiVersion("2015-02-28-Preview"))
        ).toEqual({
            input: "*",
            count: false,
            orderBy: null,
            scoringProfile: null,
            searchFields: null,
            select: null,
            skip: 0,
            top: 50,
            apiVersion: "2015-02-28-Preview",
            searchMode: "any"
        });
    });
    it("should properly set all searchParameters", () => {
        const testParameters: Store.SearchParameters = {
            input: "show me the money",
            apiVersion: "2015-02-28-Preview",
            count: true,
            orderBy: "foobar",
            scoringProfile: "abc",
            searchFields: "def",
            searchMode: "all",
            select: "hij",
            skip: 1000,
            top: 3,
        };
        expect(
            searchParameters.searchParameters(initialState, searchParametersActions.setParameters(testParameters))
        ).toEqual(testParameters);
    });
    it("should increment skip from default state", () => {
        expect(
            searchParameters.searchParameters(initialState, searchParametersActions.incrementsSkip()).skip
        ).toEqual(50);
    });
    it("should decrement skip from default state and not go below zero", () => {
        expect(
            searchParameters.searchParameters(initialState, searchParametersActions.decrementSkip()).skip
        ).toEqual(0);
    });
    it("should decrement skip", () => {
        const testParameters: Store.SearchParameters = {
            input: "show me the money",
            apiVersion: "2015-02-28-Preview",
            count: true,
            orderBy: "foobar",
            scoringProfile: "abc",
            searchFields: "def",
            searchMode: "all",
            select: "hij",
            skip: 1000,
            top: 3,
        };
        expect(
            searchParameters.searchParameters(testParameters, searchParametersActions.decrementSkip()).skip
        ).toEqual(997);
    });
});