import * as suggestions from "../suggestions";
import * as suggestionsActions from "../../actions/suggestionsActions";
import { Store } from "../../store";

const reducer = suggestions.suggestions;

let suggestionsProcessor = (suggestions: {}[]) => {
            return suggestions.map((suggestion) => {
                return {
                    "foo": "bar",
                    "search": "fuzz"
                };
            });
        };

const testSuggestions = [
    { text: "foo" },
    { text: "bar" },
    { text: "buzz"}
];

const appendSuggestions = [
    { text: "foo" },
    { text: "bar" },
    { text: "buzz"},
    { text: "foo" },
    { text: "bar" },
    { text: "buzz"}
];

const ts = Date.now();

describe("reducers/suggestions", () => {
    it("should return initial state when given empty input", () => {
        expect(
            reducer(<Store.Suggestions>undefined, <suggestionsActions.SuggestionsAction>{})
        ).toEqual(suggestions.initialState);
    });
    it("should update fetching state", () => {
        expect(
            reducer(<Store.Suggestions>{ isFetching: false, lastUpdated: 0, suggestions: []}, suggestionsActions.initiateSuggest())
        ).toEqual({
            isFetching: true,
            lastUpdated: 0,
            suggestions: []
        });
    });
    it("should save suggestions and reset fetching", () => {
        expect(
            reducer(<Store.Suggestions>{ isFetching: true, lastUpdated: 0, suggestions: [] }, suggestionsActions.recieveSuggestions(testSuggestions, ts))
        ).toEqual({
            isFetching: false,
            lastUpdated: ts,
            suggestions: testSuggestions
        });
    });
    it("should clear suggestions", () => {
        expect(
            reducer(<Store.Suggestions>{ isFetching: false, lastUpdated: ts, suggestions: testSuggestions }, suggestionsActions.clearSuggestions())
        ).toEqual({
            isFetching: false,
            lastUpdated: ts,
            suggestions: []
        });
    });
    it("should set suggestionsProcessor", () => {
        expect(
            reducer(<Store.Suggestions>{ isFetching: false, lastUpdated: 0, suggestions: [] }, suggestionsActions.setSuggestionsProcessor(suggestionsProcessor))
        ).toEqual({
            isFetching: false,
            lastUpdated: 0,
            suggestions: [],
            suggestionsProcessor
        });
    });
    it("should save suggestions and reset fetching using suggestionsProcessor", () => {
        expect(
            reducer(<Store.Suggestions>{ isFetching: true, lastUpdated: 0, suggestions: [], suggestionsProcessor }, suggestionsActions.recieveSuggestions(testSuggestions, ts))
        ).toEqual({
            isFetching: false,
            lastUpdated: ts,
            suggestions: suggestionsProcessor(testSuggestions),
            suggestionsProcessor
        });
    });
});