import * as facets from "../facets";
import * as facetsAction from "../../actions/facetsActions";
import { Store } from "../../store";

const reducer = facets.facets;

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

describe("reducers/facets", () => {
    it("should return initial state when given empty input", () => {
        expect(
            reducer(<Store.Facets>undefined, <facetsAction.FacetsAction>{})
        ).toEqual(facets.initialState);
    });
    it("should set facet mode to 'advanced'", () => {
        expect(
            reducer(facets.initialState, facetsAction.setFacetMode("advanced"))
        ).toEqual({
            facets: {},
            facetMode: "advanced"
        });
    });
    it("should add a range facet", () => {
        const expectedFacet: Store.RangeFacet = {
            key: "foo",
            min: 0,
            max: 10,
            filterLowerBound: 0,
            filterUpperBound: 10,
            lowerBucketCount: 0,
            middleBucketCount: 0,
            upperBucketCount: 0
        };
        expect(
            reducer(facets.initialState, facetsAction.addRangeFacet(expectedFacet.key, expectedFacet.min, expectedFacet.max))
        ).toEqual({
            facets: {
                "foo": expectedFacet
            },
            facetMode: "simple"
        });
    });
    it("should add a checkbox facet", () => {
        const expectedFacet: Store.CheckboxFacet = {
            key: "foo",
            isNumeric: false,
            values: []
        };
        expect(
            reducer(facets.initialState, facetsAction.addCheckboxFacet(expectedFacet.key, expectedFacet.isNumeric))
        ).toEqual({
            facets: {
                "foo": expectedFacet
            },
            facetMode: "simple"
        });
    });
});