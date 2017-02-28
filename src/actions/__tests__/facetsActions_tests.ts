import * as facetsActions from "../facetsActions";

const ts = Date.now();

describe("actions/facets", () => {
    it("should create action to set facet mode", () => {
        expect(
            facetsActions.setFacetMode("advanced")
        ).toEqual({
            type: "SET_FACET_MODE",
            facetMode: "advanced"
        });
    });
    it("should create action to to add range facet", () => {
        expect(
            facetsActions.addRangeFacet("foo", 0, 10)
        ).toEqual({
            type: "ADD_RANGE_FACET",
            key: "foo",
            min: 0,
            max: 10
        });
    });
    it("should create action to add checkbox facet", () => {
        expect(
            facetsActions.addCheckboxFacet("bar", true)
        ).toEqual({
            type: "ADD_CHECKBOX_FACET",
            key: "bar",
            isNumeric: true,
            count: 5,
            sort: "count"
        });
    });
    it("should create action to toggle checkbox facet", () => {
        expect(
            facetsActions.toggleCheckboxFacetSelection("foo", "bar")
        ).toEqual({
            type: "TOGGLE_CHECKBOX_SELECTION",
            key: "foo",
            value: "bar"
        });
    });
    it("should create action to set ranges for facet", () => {
        expect(
            facetsActions.setFacetRange("foo", 0, 10)
        ).toEqual({
            type: "SET_FACET_RANGE",
            key: "foo",
            lowerBound: 0,
            upperBound: 10
        });
    });
});