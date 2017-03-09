import * as suggestions from "../suggestions";
import * as suggestionsActions from "../../actions/suggestionsActions";
import { Store } from "../../store";

const reducer = suggestions.suggestions;

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
});