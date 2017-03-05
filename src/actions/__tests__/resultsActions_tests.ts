import * as resultsActions from "../resultsActions";

const ts = Date.now();

describe("actions/results", () => {
    it("should create the action that gets triggered when search is initiated", () => {
        expect(
            resultsActions.initiateSearch()
        ).toEqual({
            type: "INITIATE_SEARCH"
        });
    });
    it("should create action to set results after search", () => {
        expect(
            resultsActions.recieveResults([], ts, 10)
        ).toEqual({
            count: 10,
            type: "RECEIVE_RESULTS",
            results: [],
            receivedAt: ts
        });
    });
    it("should create action to append results after search", () => {
        expect(
            resultsActions.appendResults([], ts)
        ).toEqual({
            type: "APPEND_RESULTS",
            results: [],
            receivedAt: ts
        });
    });
});