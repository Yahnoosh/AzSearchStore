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
    it("should properly set api version", () => {
        const expectedParams: Store.SearchParameters = {
            count: false,
            orderby: null,
            scoringProfile: null,
            searchFields: null,
            select: null,
            skip: 0,
            top: 50,
            apiVersion: "2015-02-28-Preview",
            searchMode: "any",
            queryType: "simple",
            highlight: null,
            highlightPreTag: null,
            highlightPostTag: null,
            scoringParameters: null
        };
        expect(
            searchParameters.searchParameters(initialState, searchParametersActions.setSearchApiVersion("2015-02-28-Preview"))
        ).toEqual(expectedParams);
    });
    it("should properly set all searchParameters", () => {
        const testParameters: Store.SearchParameters = {
            apiVersion: "2015-02-28-Preview",
            count: true,
            orderby: "foobar",
            scoringProfile: "abc",
            searchFields: "def",
            searchMode: "all",
            select: "hij",
            skip: 1000,
            queryType: "full",
            top: 3,
            highlight: "foobar",
            highlightPreTag: "<em>",
            highlightPostTag: "</em>",
            scoringParameters: ["foo-bar"]
        };
        expect(
            searchParameters.searchParameters(initialState, searchParametersActions.setSearchParameters(testParameters))
        ).toEqual(testParameters);
    });
    it("should properly update subset of searchParameters", () => {
        const testParameters: Store.SearchParametersUpdate = {
            skip: 1000,
            top: 3,
            searchMode: "all",
            queryType: "full",
            highlight: "foo"
        };
        const expectedParams: Store.SearchParameters = {
            count: false,
            orderby: null,
            scoringProfile: null,
            searchFields: null,
            select: null,
            skip: 1000,
            top: 3,
            queryType: "full",
            apiVersion: "2016-09-01",
            searchMode: "all",
            highlight: "foo",
            highlightPreTag: null,
            highlightPostTag: null,
            scoringParameters: null
        };
        expect(
            searchParameters.searchParameters(initialState, searchParametersActions.updateSearchParameters(testParameters))
        ).toEqual(expectedParams);
    });
    it("should increment skip from default state", () => {
        expect(
            searchParameters.searchParameters(initialState, searchParametersActions.incrementSkip()).skip
        ).toEqual(50);
    });
    it("should decrement skip from default state and not go below zero", () => {
        expect(
            searchParameters.searchParameters(initialState, searchParametersActions.decrementSkip()).skip
        ).toEqual(0);
    });
    it("should decrement skip", () => {
        const testParameters: Store.SearchParameters = {
            apiVersion: "2015-02-28-Preview",
            count: true,
            orderby: "foobar",
            scoringProfile: "abc",
            searchFields: "def",
            searchMode: "all",
            select: "hij",
            queryType: "simple",
            skip: 1000,
            top: 3,
            highlight: "foo",
            highlightPreTag: null,
            highlightPostTag: null,
            scoringParameters: null
        };
        expect(
            searchParameters.searchParameters(testParameters, searchParametersActions.decrementSkip()).skip
        ).toEqual(997);
    });
    it("should correctly page to various values, properly observing limits.", () => {
        const testParameters: Store.SearchParameters = {
            apiVersion: "2015-02-28-Preview",
            count: true,
            orderby: "foobar",
            scoringProfile: "abc",
            searchFields: "def",
            searchMode: "all",
            select: "hij",
            queryType: "simple",
            skip: 1000,
            top: 10,
            highlight: "foo",
            highlightPreTag: null,
            highlightPostTag: null,
            scoringParameters: null
        };
        expect(
            searchParameters.searchParameters(testParameters, searchParametersActions.setPage(-4)).skip
        ).toEqual(0);
        expect(
            searchParameters.searchParameters(testParameters, searchParametersActions.setPage(1)).skip
        ).toEqual(0);
        expect(
            searchParameters.searchParameters(testParameters, searchParametersActions.setPage(10001)).skip
        ).toEqual(100000);
        expect(
            searchParameters.searchParameters(testParameters, searchParametersActions.setPage(10002)).skip
        ).toEqual(100000);
        expect(
            searchParameters.searchParameters(testParameters, searchParametersActions.setPage(5)).skip
        ).toEqual(40);
    });
});