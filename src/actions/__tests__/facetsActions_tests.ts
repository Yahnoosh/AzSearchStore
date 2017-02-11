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
            isNumeric: true
        });
    });
});