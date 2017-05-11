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
            globalFilters: {},
            facetMode: "advanced"
        });
    });
    it("should add a number range facet", () => {
        const expectedFacet: Store.RangeFacet = {
            type: "RangeFacet",
            dataType: "number",
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
            reducer(facets.initialState, facetsAction.addRangeFacet(expectedFacet.key, "number", expectedFacet.min, expectedFacet.max))
        ).toEqual({
            facets: {
                "foo": expectedFacet
            },
            globalFilters: {},
            facetMode: "simple"
        });
    });
    it("should add a date range facet", () => {
        const expectedFacet: Store.RangeFacet = {
            type: "RangeFacet",
            dataType: "date",
            key: "foo",
            min: new Date(1990),
            max: new Date(2017),
            filterLowerBound: new Date(1990),
            filterUpperBound: new Date(2017),
            lowerBucketCount: 0,
            middleBucketCount: 0,
            upperBucketCount: 0,
            filterClause: "",
            facetClause: "foo,values:1970-01-01T00:00:01.990Z|1970-01-01T00:00:02.017Z"
        };
        expect(
            reducer(facets.initialState, facetsAction.addRangeFacet(expectedFacet.key, "date", expectedFacet.min, expectedFacet.max))
        ).toEqual({
            facets: {
                "foo": expectedFacet
            },
            globalFilters: {},
            facetMode: "simple"
        });
    });
    it("should add a numeric checkbox facet", () => {
        const expectedFacet: Store.CheckboxFacet = {
            type: "CheckboxFacet",
            key: "foo",
            dataType: "number",
            values: {},
            count: 5,
            sort: "count",
            filterClause: "",
            facetClause: "foo,count:5,sort:count"
        };
        expect(
            reducer(facets.initialState, facetsAction.addCheckboxFacet(expectedFacet.key, expectedFacet.dataType))
        ).toEqual({
            facets: {
                "foo": expectedFacet
            },
            globalFilters: {},
            facetMode: "simple"
        });
    });
    it("should add a collection checkbox facet", () => {
        const expectedFacet: Store.CheckboxFacet = {
            type: "CheckboxFacet",
            key: "foo",
            dataType: "collection",
            values: {},
            count: 5,
            sort: "count",
            filterClause: "",
            facetClause: "foo,count:5,sort:count"
        };
        expect(
            reducer(facets.initialState, facetsAction.addCheckboxFacet(expectedFacet.key, expectedFacet.dataType))
        ).toEqual({
            facets: {
                "foo": expectedFacet
            },
            globalFilters: {},
            facetMode: "simple"
        });
    });
    it("should set the range for a number range facet", () => {
        const initialFacet: Store.RangeFacet = {
            type: "RangeFacet",
            dataType: "number",
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
            dataType: "number",
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
            dataType: "number",
            min: 0,
            max: 10,
            filterLowerBound: 5,
            filterUpperBound: 7,
            lowerBucketCount: 0,
            middleBucketCount: 0,
            upperBucketCount: 0,
            filterClause: "foo ge 5 and foo le 7",
            facetClause: "foo,values:5|7"
        };
        const initialFacets: Store.Facets = {
            globalFilters: {},
            facetMode: "simple",
            facets: { foo: initialFacet, dummy: dummyFacet }
        };
        const expectedFacets: Store.Facets = {
            globalFilters: {},
            facetMode: "simple",
            facets: { foo: expectedFacet, dummy: dummyFacet }
        };
        expect(
            reducer(initialFacets, facetsAction.setFacetRange("foo", 5, 7))
        ).toEqual(expectedFacets);
    });
    it("should set the range for a date range facet", () => {
        const initialFacet: Store.RangeFacet = {
            type: "RangeFacet",
            dataType: "date",
            key: "foo",
            min: new Date(1990),
            max: new Date(2017),
            filterLowerBound: new Date(1990),
            filterUpperBound: new Date(2017),
            lowerBucketCount: 0,
            middleBucketCount: 0,
            upperBucketCount: 0,
            filterClause: "",
            facetClause: "foo,values:1970-01-01T00:00:01.990Z|1970-01-01T00:00:02.017Z"
        };
        const dummyFacet: Store.RangeFacet = {
            type: "RangeFacet",
            key: "dummy",
            dataType: "number",
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
            dataType: "date",
            min: new Date(1990),
            max: new Date(2017),
            filterLowerBound: new Date(1999),
            filterUpperBound: new Date(2015),
            lowerBucketCount: 0,
            middleBucketCount: 0,
            upperBucketCount: 0,
            filterClause: "foo ge 1970-01-01T00:00:01.999Z and foo le 1970-01-01T00:00:02.015Z",
            facetClause: "foo,values:1970-01-01T00:00:01.999Z|1970-01-01T00:00:02.015Z"
        };
        const initialFacets: Store.Facets = {
            globalFilters: {},
            facetMode: "simple",
            facets: { foo: initialFacet, dummy: dummyFacet }
        };
        const expectedFacets: Store.Facets = {
            globalFilters: {},
            facetMode: "simple",
            facets: { foo: expectedFacet, dummy: dummyFacet }
        };
        expect(
            reducer(initialFacets, facetsAction.setFacetRange("foo", new Date(1999), new Date(2015)))
        ).toEqual(expectedFacets);
    });
    it("should toggle the value of a checkbox facet value, then toggle another value, verify facet and filter clauses", () => {
        const initialFacet: Store.CheckboxFacet = {
            type: "CheckboxFacet",
            key: "foo",
            dataType: "string",
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
            dataType: "string",
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
            dataType: "string",
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
            dataType: "string",
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
            globalFilters: {},
            facetMode: "simple",
            facets: { foo: initialFacet, dummy: dummyFacet }
        };
        const firstToggleExpectedFacets: Store.Facets = {
            globalFilters: {},
            facetMode: "simple",
            facets: { foo: firstToggleFacet, dummy: dummyFacet }
        };
        const secondToggleExpectedFacets: Store.Facets = {
            globalFilters: {},
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
    it("should toggle the value of a collection checkbox facet value, and verify facet and filter clauses", () => {
        const initialFacet: Store.CheckboxFacet = {
            type: "CheckboxFacet",
            key: "foo",
            dataType: "collection",
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
            dataType: "string",
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
            dataType: "collection",
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
            filterClause: "(foo/any(t: t eq 'a'))",
            facetClause: "foo,count:5,sort:count"
        };

        const initialFacets: Store.Facets = {
            globalFilters: {},
            facetMode: "simple",
            facets: { foo: initialFacet, dummy: dummyFacet }
        };
        const firstToggleExpectedFacets: Store.Facets = {
            globalFilters: {},
            facetMode: "simple",
            facets: { foo: firstToggleFacet, dummy: dummyFacet }
        };
        expect(
            reducer(initialFacets, facetsAction.toggleCheckboxFacetSelection("foo", "a"))
        ).toEqual(firstToggleExpectedFacets);
    });
    it("should set incoming values for facets, ignoring @odata type annotations", () => {
        const checkFacet: Store.CheckboxFacet = {
            type: "CheckboxFacet",
            key: "foo",
            dataType: "string",
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
            dataType: "number",
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
            dataType: "string",
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
            dataType: "number",
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
            globalFilters: {},
            facetMode: "simple",
            facets: {
                "foo": checkFacet,
                "bar": rangeFacet
            }
        };

        const expectedFacets: Store.Facets = {
            globalFilters: {},
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
            dataType: "string",
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
            dataType: "number",
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
            dataType: "string",
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
            dataType: "string",
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
            dataType: "number",
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
            globalFilters: {},
            facetMode: "simple",
            facets: {
                "foo": checkFacet,
                "bar": rangeFacet,
                "buzz": dummyCheckFacet
            }
        };

        const expectedFacets: Store.Facets = {
            globalFilters: {},
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
    it("should update incoming values for facets. Should overwrite values for facets with no selection", () => {
        const checkFacetSelected: Store.CheckboxFacet = {
            type: "CheckboxFacet",
            key: "foo",
            dataType: "string",
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

        const checkFacetUnselected: Store.CheckboxFacet = {
            type: "CheckboxFacet",
            key: "bar",
            dataType: "string",
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
            facetClause: "bar,count:5,sort:count"
        };

        const expectedCheckFacetSelected: Store.CheckboxFacet = {
            type: "CheckboxFacet",
            key: "foo",
            dataType: "string",
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

        const expectedCheckFacetUnselected: Store.CheckboxFacet = {
            type: "CheckboxFacet",
            key: "bar",
            dataType: "string",
            values: {
                a: {
                    value: "a",
                    count: 11,
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
            filterClause: "",
            facetClause: "bar,count:5,sort:count"
        };

        const initialFacets: Store.Facets = {
            globalFilters: {},
            facetMode: "simple",
            facets: {
                "foo": checkFacetSelected,
                "bar": checkFacetUnselected,
            }
        };

        const expectedFacets: Store.Facets = {
            globalFilters: {},
            facetMode: "simple",
            facets: {
                "foo": expectedCheckFacetSelected,
                "bar": expectedCheckFacetUnselected,
            }
        };

        const facetResults: { [key: string]: Store.FacetResult[] } = {
            "foo": [
                { value: "a", count: 11 },
                { value: "c", count: 12 },
                { value: "d", count: 13 }
            ],
            "bar": [
                { value: "a", count: 11 },
                { value: "c", count: 12 },
                { value: "d", count: 13 }
            ],
            "bar@odata.type": <any>"#Collection(Microsoft.Azure.Search.V2016_09_01.QueryResultFacet)"
        };

        expect(
            reducer(initialFacets, facetsAction.updateFacetsValues(facetResults))
        ).toEqual(expectedFacets);
    });
    it("should update incoming values for numeric facet, ignoring @odata keys", () => {
        const checkFacet: Store.CheckboxFacet = {
            type: "CheckboxFacet",
            key: "foo",
            dataType: "number",
            values: {
                0: {
                    value: 0,
                    count: 5,
                    selected: true
                },
                1: {
                    value: 1,
                    count: 5,
                    selected: false
                }
            },
            count: 5,
            sort: "count",
            filterClause: "( foo eq 0 )",
            facetClause: "foo,count:5,sort:count"
        };

        const expectedCheckFacet: Store.CheckboxFacet = {
            type: "CheckboxFacet",
            key: "foo",
            dataType: "number",
            values: {
                0: {
                    value: 0,
                    count: 11,
                    selected: true
                },
                1: {
                    value: 1,
                    count: 0,
                    selected: false
                },
                2: {
                    value: 2,
                    count: 12,
                    selected: false
                },
                3: {
                    value: 3,
                    count: 13,
                    selected: false
                }
            },
            count: 5,
            sort: "count",
            filterClause: "( foo eq 0 )",
            facetClause: "foo,count:5,sort:count"
        };

        const initialFacets: Store.Facets = {
            globalFilters: {},
            facetMode: "simple",
            facets: {
                "foo": checkFacet
            }
        };

        const expectedFacets: Store.Facets = {
            globalFilters: {},
            facetMode: "simple",
            facets: {
                "foo": expectedCheckFacet,
            }
        };

        const facetResults: { [key: string]: Store.FacetResult[] } = {
            "foo": [
                { value: 0, count: 11 },
                { value: 2, count: 12 },
                { value: 3, count: 13 }
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
            dataType: "string",
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
            dataType: "number",
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
            dataType: "string",
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
            dataType: "number",
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
            globalFilters: {},
            facetMode: "simple",
            facets: {
                "foo": checkFacet,
                "bar": rangeFacet,
            }
        };

        const expectedFacets: Store.Facets = {
            globalFilters: {},
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
    it("should set global filter", () => {
        const checkFacet: Store.CheckboxFacet = {
            type: "CheckboxFacet",
            key: "foo",
            dataType: "string",
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
            dataType: "number",
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

        const initialFacets: Store.Facets = {
            globalFilters: {},
            facetMode: "simple",
            facets: {
                "foo": checkFacet,
                "bar": rangeFacet,
            }
        };

        const expectedFacets: Store.Facets = {
            globalFilters: { buzz: "buzz lt 6" },
            facetMode: "simple",
            facets: {
                "foo": checkFacet,
                "bar": rangeFacet,
            }
        };

        expect(
            reducer(initialFacets, facetsAction.setGlobalFilter("buzz", "buzz lt 6"))
        ).toEqual(expectedFacets);
    });
});