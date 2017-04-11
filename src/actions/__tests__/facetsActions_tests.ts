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
    it("should create action to to add numeric range facet", () => {
        expect(
            facetsActions.addRangeFacet("foo", "number", 0, 10)
        ).toEqual({
            type: "ADD_RANGE_FACET",
            dataType: "number",
            key: "foo",
            min: 0,
            max: 10
        });
    });
    it("should create action to to add date range facet", () => {
        expect(
            facetsActions.addRangeFacet("bar", "date", new Date(1990), new Date(2017))
        ).toEqual({
            type: "ADD_RANGE_FACET",
            dataType: "date",
            key: "bar",
            min: new Date(1990),
            max: new Date(2017)
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
    it("should create action to values for facets", () => {
        expect(
            facetsActions.setFacetsValues({})
        ).toEqual({
            type: "SET_FACETS_VALUES",
            facets: {}
        });
    });
    it("should create action to update values for a facet", () => {
        expect(
            facetsActions.updateFacetsValues({})
        ).toEqual({
            type: "UPDATE_FACETS_VALUES",
            facets: {}
        });
    });
    it("should create action to clear selected values/ranges from facets", () => {
        expect(
            facetsActions.clearFacetsSelections()
        ).toEqual({
            type: "CLEAR_FACETS_SELECTIONS",
        });
    });
});