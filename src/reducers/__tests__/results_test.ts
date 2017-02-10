import * as results from "../results";
import * as resultsActions from "../../actions/resultsActions";
import { Store } from "../../store";

const reducer = results.results;

const testResults = [
    { text: "foo" },
    { text: "bar" },
    { text: "buzz"}
];

const appendResults = [
    { text: "foo" },
    { text: "bar" },
    { text: "buzz"},
    { text: "foo" },
    { text: "bar" },
    { text: "buzz"}
];

const ts = Date.now();

describe("reducers/results", () => {
    it("should return initial state when given empty input", () => {
        expect(
            reducer(<Store.SearchResults>undefined, <resultsActions.ResultsAction>{})
        ).toEqual(results.initialState);
    });
    it("should update fetching state", () => {
        expect(
            reducer(<Store.SearchResults>{ isFetching: false, lastUpdated: 0, results: []}, resultsActions.initiateSearch())
        ).toEqual({
            isFetching: true,
            lastUpdated: 0,
            results: []
        });
    });
    it("should save results and reset fetching", () => {
        expect(
            reducer(<Store.SearchResults>{ isFetching: true, lastUpdated: 0, results: []}, resultsActions.recieveResults(testResults, ts))
        ).toEqual({
            isFetching: false,
            lastUpdated: ts,
            results: testResults
        });
    });
    it("should append results and reset fetching", () => {
        expect(
            reducer(<Store.SearchResults>{ isFetching: true, lastUpdated: 0, results: testResults}, resultsActions.appendResults(testResults, ts))
        ).toEqual({
            isFetching: false,
            lastUpdated: ts,
            results: appendResults
        });
    });
});