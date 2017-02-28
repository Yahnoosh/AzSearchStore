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
            type: "RangeFacet",
            key: "foo",
            min: 0,
            max: 10,
            filterLowerBound: 0,
            filterUpperBound: 10,
            lowerBucketCount: 0,
            middleBucketCount: 0,
            upperBucketCount: 0,
            filterClause: "",
            facetClause: "foo,values:0|10"
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
            type: "CheckboxFacet",
            key: "foo",
            isNumeric: false,
            values: {},
            count: 5,
            sort: "count",
            filterClause: "",
            facetClause: "foo,count:5,sort:count"
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
    it("should set the range for a range facet", () => {
        const initialFacet: Store.RangeFacet = {
            type: "RangeFacet",
            key: "foo",
            min: 0,
            max: 10,
            filterLowerBound: 0,
            filterUpperBound: 10,
            lowerBucketCount: 0,
            middleBucketCount: 0,
            upperBucketCount: 0,
            filterClause: "",
            facetClause: "foo,values:0|10"
        };
        const dummyFacet: Store.RangeFacet = {
            type: "RangeFacet",
            key: "dummy",
            min: 0,
            max: 10,
            filterLowerBound: 0,
            filterUpperBound: 10,
            lowerBucketCount: 0,
            middleBucketCount: 0,
            upperBucketCount: 0,
            filterClause: "",
            facetClause: "dummy,values:0|10"
        };
        const expectedFacet: Store.RangeFacet = {
            type: "RangeFacet",
            key: "foo",
            min: 0,
            max: 10,
            filterLowerBound: 5,
            filterUpperBound: 7,
            lowerBucketCount: 0,
            middleBucketCount: 0,
            upperBucketCount: 0,
            filterClause: "",
            facetClause: "foo,values:0|10"
        };
        const initialFacets: Store.Facets = {
            facetMode: "simple",
            facets: {foo: initialFacet, dummy: dummyFacet}
        };
        const expectedFacets: Store.Facets = {
            facetMode: "simple",
            facets: {foo: expectedFacet, dummy: dummyFacet}
        };
        expect(
            reducer(initialFacets, facetsAction.setFacetRange("foo", 5, 7))
        ).toEqual(expectedFacets);
    });
    it("should toggle the value of a checkbox facet value", () => {
        const initialFacet: Store.CheckboxFacet = {
            type: "CheckboxFacet",
            key: "foo",
            isNumeric: false,
            values: {
                a: {
                    value: "a",
                    count: 5,
                    selected: false
                },
                b: {
                    value: "b",
                    count: 5,
                    selected: false
                }
            },
            count: 5,
            sort: "count",
            filterClause: "",
            facetClause: "foo,count:5,sort:count"
        };
        const dummyFacet: Store.CheckboxFacet = {
            type: "CheckboxFacet",
            key: "dummy",
            isNumeric: false,
            values: {
                a: {
                    value: "a",
                    count: 5,
                    selected: false
                },
                b: {
                    value: "b",
                    count: 5,
                    selected: false
                }
            },
            count: 5,
            sort: "count",
            filterClause: "",
            facetClause: "dummy,count:5,sort:count"
        };
        const expectedFacet: Store.CheckboxFacet = {
            type: "CheckboxFacet",
            key: "foo",
            isNumeric: false,
            values: {
                a: {
                    value: "a",
                    count: 5,
                    selected: true
                },
                b: {
                    value: "b",
                    count: 5,
                    selected: false
                }
            },
            count: 5,
            sort: "count",
            filterClause: "",
            facetClause: "foo,count:5,sort:count"
        };
        const initialFacets: Store.Facets = {
            facetMode: "simple",
            facets: {foo: initialFacet, dummy: dummyFacet}
        };
        const expectedFacets: Store.Facets = {
            facetMode: "simple",
            facets: {foo: expectedFacet, dummy: dummyFacet}
        };
        expect(
            reducer(initialFacets, facetsAction.toggleCheckboxFacetSelection("foo", "a"))
        ).toEqual(expectedFacets);
    });
});