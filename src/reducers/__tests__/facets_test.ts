import * as facets from "../facets";
import * as facetsAction from "../../actions/facetsActions";
import { Store } from "../../store";

const reducer = facets.facets;

const testResults = [
    { text: "foo" },
    { text: "bar" },
    { text: "buzz" }
];

const appendResults = [
    { text: "foo" },
    { text: "bar" },
    { text: "buzz" },
    { text: "foo" },
    { text: "bar" },
    { text: "buzz" }
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
            filterClause: "foo ge 5 and foo le 7",
            facetClause: "foo,values:0|10"
        };
        const initialFacets: Store.Facets = {
            facetMode: "simple",
            facets: { foo: initialFacet, dummy: dummyFacet }
        };
        const expectedFacets: Store.Facets = {
            facetMode: "simple",
            facets: { foo: expectedFacet, dummy: dummyFacet }
        };
        expect(
            reducer(initialFacets, facetsAction.setFacetRange("foo", 5, 7))
        ).toEqual(expectedFacets);
    });
    it("should toggle the value of a checkbox facet value, then toggle another value, verify facet and filter clauses", () => {
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
        const firstToggleFacet: Store.CheckboxFacet = {
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
            filterClause: "(foo eq 'a')",
            facetClause: "foo,count:5,sort:count"
        };
        const secondToggleFacet: Store.CheckboxFacet = {
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
                    selected: true
                }
            },
            count: 5,
            sort: "count",
            filterClause: "(foo eq 'a' or foo eq 'b')",
            facetClause: "foo,count:5,sort:count"
        };
        const initialFacets: Store.Facets = {
            facetMode: "simple",
            facets: { foo: initialFacet, dummy: dummyFacet }
        };
        const firstToggleExpectedFacets: Store.Facets = {
            facetMode: "simple",
            facets: { foo: firstToggleFacet, dummy: dummyFacet }
        };
        const secondToggleExpectedFacets: Store.Facets = {
            facetMode: "simple",
            facets: { foo: secondToggleFacet, dummy: dummyFacet }
        };
        expect(
            reducer(initialFacets, facetsAction.toggleCheckboxFacetSelection("foo", "a"))
        ).toEqual(firstToggleExpectedFacets);
        expect(
            reducer(firstToggleExpectedFacets, facetsAction.toggleCheckboxFacetSelection("foo", "b"))
        ).toEqual(secondToggleExpectedFacets);
    });
    it("should set incoming values for facets, ignoring @odata type annotations", () => {
        const checkFacet: Store.CheckboxFacet = {
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
        const rangeFacet: Store.RangeFacet = {
            type: "RangeFacet",
            key: "bar",
            min: 0,
            max: 10,
            filterLowerBound: 5,
            filterUpperBound: 7,
            lowerBucketCount: 0,
            middleBucketCount: 0,
            upperBucketCount: 0,
            filterClause: "bar ge 5 and bar le 7",
            facetClause: "bar,values:0|10"
        };

        const expectedCheckFacet: Store.CheckboxFacet = {
            type: "CheckboxFacet",
            key: "foo",
            isNumeric: false,
            values: {
                c: {
                    value: "c",
                    count: 10,
                    selected: false
                },
                d: {
                    value: "d",
                    count: 17,
                    selected: false
                }
            },
            count: 5,
            sort: "count",
            filterClause: "",
            facetClause: "foo,count:5,sort:count"
        };
        const expectedRangeFacet: Store.RangeFacet = {
            type: "RangeFacet",
            key: "bar",
            min: 0,
            max: 10,
            filterLowerBound: 0,
            filterUpperBound: 10,
            lowerBucketCount: 0,
            middleBucketCount: 100,
            upperBucketCount: 0,
            filterClause: "",
            facetClause: "bar,values:0|10"
        };

        const initialFacets: Store.Facets = {
            facetMode: "simple",
            facets: {
                "foo": checkFacet,
                "bar": rangeFacet
            }
        };

        const expectedFacets: Store.Facets = {
            facetMode: "simple",
            facets: {
                "foo": expectedCheckFacet,
                "bar": expectedRangeFacet
            }
        };

        const facetResults: { [key: string]: Store.FacetResult[] } = {
            "foo": [
                { value: "c", count: 10 },
                { value: "d", count: 17 }
            ],
            "bar": [
                { to: rangeFacet.min, count: 0 },
                { from: rangeFacet.min, to: rangeFacet.max, count: 100 },
                { from: rangeFacet.max, count: 0 }
            ],
            "bar@odata.type": <any>"#Collection(Microsoft.Azure.Search.V2016_09_01.QueryResultFacet)"
        };

        expect(
            reducer(initialFacets, facetsAction.setFacetsValues(facetResults))
        ).toEqual(expectedFacets);
    });
    it("should update incoming values for facets, ignoring @odata keys", () => {
        const checkFacet: Store.CheckboxFacet = {
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
            filterClause: "( foo eq 'a )",
            facetClause: "foo,count:5,sort:count"
        };
        const rangeFacet: Store.RangeFacet = {
            type: "RangeFacet",
            key: "bar",
            min: 0,
            max: 10,
            filterLowerBound: 5,
            filterUpperBound: 7,
            lowerBucketCount: 0,
            middleBucketCount: 0,
            upperBucketCount: 0,
            filterClause: "bar ge 5 and bar le 7",
            facetClause: "bar,values:0|10"
        };

        const dummyCheckFacet: Store.CheckboxFacet = {
            type: "CheckboxFacet",
            key: "buzz",
            isNumeric: false,
            values: {
                c: {
                    value: "c",
                    count: 10,
                    selected: true
                },
                d: {
                    value: "d",
                    count: 17,
                    selected: false
                }
            },
            count: 5,
            sort: "count",
            filterClause: "( buzz eq 'c' )",
            facetClause: "buzz,count:5,sort:count"
        };
        const expectedCheckFacet: Store.CheckboxFacet = {
            type: "CheckboxFacet",
            key: "foo",
            isNumeric: false,
            values: {
                a: {
                    value: "a",
                    count: 11,
                    selected: true
                },
                b: {
                    value: "b",
                    count: 0,
                    selected: false
                },
                c: {
                    value: "c",
                    count: 12,
                    selected: false
                },
                d: {
                    value: "d",
                    count: 13,
                    selected: false
                }
            },
            count: 5,
            sort: "count",
            filterClause: "( foo eq 'a )",
            facetClause: "foo,count:5,sort:count"
        };
        const expectedRangeFacet: Store.RangeFacet = {
            type: "RangeFacet",
            key: "bar",
            min: 0,
            max: 10,
            filterLowerBound: 5,
            filterUpperBound: 7,
            lowerBucketCount: 1,
            middleBucketCount: 2,
            upperBucketCount: 3,
            filterClause: "bar ge 5 and bar le 7",
            facetClause: "bar,values:0|10"
        };

        const initialFacets: Store.Facets = {
            facetMode: "simple",
            facets: {
                "foo": checkFacet,
                "bar": rangeFacet,
                "buzz": dummyCheckFacet
            }
        };

        const expectedFacets: Store.Facets = {
            facetMode: "simple",
            facets: {
                "foo": expectedCheckFacet,
                "bar": expectedRangeFacet,
                "buzz": dummyCheckFacet
            }
        };

        const facetResults: { [key: string]: Store.FacetResult[] } = {
            "foo": [
                { value: "a", count: 11 },
                { value: "c", count: 12 },
                { value: "d", count: 13 }
            ],
            "bar": [
                { to: 5, count: 1 },
                { from: 5, to: 7, count: 2 },
                { from: 7, count: 3 }
            ],
            "bar@odata.type": <any>"#Collection(Microsoft.Azure.Search.V2016_09_01.QueryResultFacet)"
        };

        expect(
            reducer(initialFacets, facetsAction.updateFacetsValues(facetResults))
        ).toEqual(expectedFacets);
    });
    it("should clear all selected values/ranges and clear filter for all facets", () => {
        const checkFacet: Store.CheckboxFacet = {
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
            filterClause: "( foo eq 'a )",
            facetClause: "foo,count:5,sort:count"
        };
        const rangeFacet: Store.RangeFacet = {
            type: "RangeFacet",
            key: "bar",
            min: 0,
            max: 10,
            filterLowerBound: 5,
            filterUpperBound: 7,
            lowerBucketCount: 4,
            middleBucketCount: 5,
            upperBucketCount: 3,
            filterClause: "bar ge 5 and bar le 7",
            facetClause: "bar,values:0|10"
        };

        const expectedCheckFacet: Store.CheckboxFacet = {
            type: "CheckboxFacet",
            key: "foo",
            isNumeric: false,
            values: {
                a: {
                    value: "a",
                    count: 0,
                    selected: false
                },
                b: {
                    value: "b",
                    count: 0,
                    selected: false
                }
            },
            count: 5,
            sort: "count",
            filterClause: "",
            facetClause: "foo,count:5,sort:count"
        };
        const expectedRangeFacet: Store.RangeFacet = {
            type: "RangeFacet",
            key: "bar",
            min: 0,
            max: 10,
            filterLowerBound: 0,
            filterUpperBound: 10,
            lowerBucketCount: 0,
            middleBucketCount: 0,
            upperBucketCount: 0,
            filterClause: "",
            facetClause: "bar,values:0|10"
        };

        const initialFacets: Store.Facets = {
            facetMode: "simple",
            facets: {
                "foo": checkFacet,
                "bar": rangeFacet,
            }
        };

        const expectedFacets: Store.Facets = {
            facetMode: "simple",
            facets: {
                "foo": expectedCheckFacet,
                "bar": expectedRangeFacet,
            }
        };

        expect(
            reducer(initialFacets, facetsAction.clearFacetsSelections())
        ).toEqual(expectedFacets);
    });
});