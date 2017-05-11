import * as searchParameters from "../../reducers/searchParameters";
import * as suggestionsParameters from "../../reducers/suggestionsParameters";
import * as input from "../../reducers/input";
import { Store } from "../../store";
import * as uriHelper from "../uriHelper";
import * as URI from "urijs";

const config: Store.Config = {
    index: "foo",
    queryKey: "bar",
    service: "buzz"
};

const testSearchParameters: Store.SearchParameters = {
    apiVersion: "2015-02-28-Preview",
    count: true,
    orderby: "foobar",
    scoringProfile: "abc",
    searchFields: "def",
    searchMode: "all",
    select: "hij",
    skip: 1000,
    top: 3,
    queryType: "simple",
    highlight: "foo",
    highlightPreTag: "<em>",
    highlightPostTag: "</em>",
    scoringParameters: ["mylocation--122.2,44.8"]
};

const testSuggestionsParameters: Store.SuggestionsParameters = {
    orderby: null,
    searchFields: null,
    select: null,
    top: 5,
    apiVersion: "2016-09-01",
    filter: null,
    fuzzy: false,
    highlightPostTag: null,
    highlightPreTag: null,
    suggesterName: "sg"
};

const testParameters: Store.Parameters = {
    input: "show me the money",
    searchParameters: testSearchParameters,
    suggestionsParameters: testSuggestionsParameters
};

const parameterInitialState: Store.Parameters = {
    input: input.initialState,
    searchParameters: searchParameters.initialState,
    suggestionsParameters: suggestionsParameters.initialState
};

const initFacets: Store.Facets = {
    globalFilters: {},
    facetMode: "simple",
    facets: {}
};

const testFacets: Store.Facets = {
    globalFilters: {},
    facetMode: "simple",
    facets: {
        foo: {
            type: "RangeFacet",
            key: "foo",
            dataType: "number",
            min: 0,
            max: 10,
            filterLowerBound: 0,
            filterUpperBound: 10,
            lowerBucketCount: 0,
            middleBucketCount: 0,
            upperBucketCount: 0,
            filterClause: "",
            facetClause: "foo,values:0|10"
        },
        bar: {
            type: "CheckboxFacet",
            key: "bar",
            dataType: "string",
            values: {},
            count: 5,
            sort: "count",
            filterClause: "",
            facetClause: "bar,count:5,sort:count"
        }
    }
};

const filteredFacets: Store.Facets = {
    globalFilters: {},
    facetMode: "simple",
    facets: {
        foo: {
            type: "RangeFacet",
            dataType: "number",
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
        },
        bar: {
            type: "CheckboxFacet",
            key: "bar",
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
            filterClause: "(bar eq 'a')",
            facetClause: "bar,count:5,sort:count"
        }
    }
};

const filteredFacetsWithGlobalFilter: Store.Facets = {
    globalFilters: { "buzz": "buzz lt 5" },
    facetMode: "simple",
    facets: {
        foo: {
            type: "RangeFacet",
            dataType: "number",
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
        },
        bar: {
            type: "CheckboxFacet",
            key: "bar",
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
            filterClause: "(bar eq 'a')",
            facetClause: "bar,count:5,sort:count"
        }
    }
};

const filteredFacetsWithGlobalFilters: Store.Facets = {
    globalFilters: {
        "buzz": "buzz lt 5",
        "bang": "bang gt 0",
        "fizz": ""
    },
    facetMode: "simple",
    facets: {
        foo: {
            type: "RangeFacet",
            dataType: "number",
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
        },
        bar: {
            type: "CheckboxFacet",
            key: "bar",
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
            filterClause: "(bar eq 'a')",
            facetClause: "bar,count:5,sort:count"
        }
    }
};

describe("utils/uriHelper", () => {
    it("should create a search uri from test config and default parameters", () => {
        const uriString = uriHelper.buildSearchURI(config, parameterInitialState);
        const searchURI = URI(uriString);
        expect(
            searchURI.valueOf()
        ).toEqual("https://buzz.search.windows.net/indexes/foo/docs/search?api-version=2016-09-01");
        expect(searchURI.hasQuery("api-version", "2016-09-01")).toBe(true);
    });
    it("should create a search post body from test config and custom parameters", () => {
        const postBody = uriHelper.buildPostBody(testParameters.searchParameters, testParameters.input, uriHelper.searchParameterValidator, initFacets);
        expect(
            postBody
        ).toEqual({
            "count": true,
            "orderby": "foobar",
            "queryType": "simple",
            "scoringProfile": "abc",
            "search": "show me the money",
            "searchFields": "def",
            "searchMode": "all",
            "select": "hij",
            "skip": 1000,
            "top": 3,
            "highlight": "foo",
            "highlightPreTag": "<em>",
            "highlightPostTag": "</em>",
            "scoringParameters": ["mylocation--122.2,44.8"]
        });
    });
    it("should create a search uri from test config, default searchParameters and custom facets", () => {
        const postBody = uriHelper.buildPostBody(testParameters.searchParameters, testParameters.input, uriHelper.searchParameterValidator, testFacets);
        expect(
            postBody
        ).toEqual({
            "count": true,
            "facets": ["foo,values:0|10", "bar,count:5,sort:count"],
            "orderby": "foobar",
            "queryType": "simple",
            "scoringProfile": "abc",
            "search": "show me the money",
            "searchFields": "def",
            "searchMode": "all",
            "select": "hij",
            "skip": 1000,
            "top": 3,
            "highlight": "foo",
            "highlightPreTag": "<em>",
            "highlightPostTag": "</em>",
            "scoringParameters": ["mylocation--122.2,44.8"]
        });
    });
    it("should create a search uri from test config, default searchParameters and custom facets with filters", () => {
        const postBody = uriHelper.buildPostBody(testParameters.searchParameters, testParameters.input, uriHelper.searchParameterValidator, filteredFacets);
        expect(
            postBody
        ).toEqual({
            "count": true,
            "facets": ["foo,values:0|10", "bar,count:5,sort:count"],
            "filter": "foo ge 5 and foo le 7 and (bar eq \'a\')",
            "orderby": "foobar",
            "queryType": "simple",
            "scoringProfile": "abc",
            "search": "show me the money",
            "searchFields": "def",
            "searchMode": "all",
            "select": "hij",
            "skip": 1000,
            "top": 3,
            "highlight": "foo",
            "highlightPreTag": "<em>",
            "highlightPostTag": "</em>",
            "scoringParameters": ["mylocation--122.2,44.8"]
        });
    });
    it("should create a suggest uri from test config, and test suggestions parameters", () => {
        const uriString = uriHelper.buildSuggestionsURI(config, testParameters);
        const searchURI = URI(uriString);
        expect(
            searchURI.valueOf()
        ).toEqual("https://buzz.search.windows.net/indexes/foo/docs/suggest?api-version=2016-09-01");
        expect(searchURI.hasQuery("api-version", "2016-09-01")).toBe(true);
    });
    it("should create a suggestions post body from test config, and test suggestions parameters", () => {
        const postBody = uriHelper.buildPostBody(testParameters.suggestionsParameters, testParameters.input, uriHelper.suggestParameterValidator);
        expect(
            postBody
        ).toEqual({
            top: 5,
            fuzzy: false,
            suggesterName: "sg",
            search: "show me the money"
        });

    });
    it("should create a search uri from test config, default searchParameters and custom facets, filters, and a global filter", () => {
        const postBody = uriHelper.buildPostBody(testParameters.searchParameters, testParameters.input, uriHelper.searchParameterValidator, filteredFacetsWithGlobalFilter);
        expect(
            postBody
        ).toEqual({
            "count": true,
            "facets": ["foo,values:0|10", "bar,count:5,sort:count"],
            "filter": "foo ge 5 and foo le 7 and (bar eq \'a\') and buzz lt 5",
            "orderby": "foobar",
            "queryType": "simple",
            "scoringProfile": "abc",
            "search": "show me the money",
            "searchFields": "def",
            "searchMode": "all",
            "select": "hij",
            "skip": 1000,
            "top": 3,
            "highlight": "foo",
            "highlightPreTag": "<em>",
            "highlightPostTag": "</em>",
            "scoringParameters": ["mylocation--122.2,44.8"]
        });
    });
    it("should create a search uri from test config, default searchParameters and custom facets, filters, and multiple global filters", () => {
        const postBody = uriHelper.buildPostBody(testParameters.searchParameters, testParameters.input, uriHelper.searchParameterValidator, filteredFacetsWithGlobalFilters);
        expect(
            postBody
        ).toEqual({
            "count": true,
            "facets": ["foo,values:0|10", "bar,count:5,sort:count"],
            "filter": "foo ge 5 and foo le 7 and (bar eq \'a\') and buzz lt 5 and bang gt 0",
            "orderby": "foobar",
            "queryType": "simple",
            "scoringProfile": "abc",
            "search": "show me the money",
            "searchFields": "def",
            "searchMode": "all",
            "select": "hij",
            "skip": 1000,
            "top": 3,
            "highlight": "foo",
            "highlightPreTag": "<em>",
            "highlightPostTag": "</em>",
            "scoringParameters": ["mylocation--122.2,44.8"]
        });
    });
    it("should create a suggest uri from test config, and test suggestions parameters", () => {
        const uriString = uriHelper.buildSuggestionsURI(config, testParameters);
        const searchURI = URI(uriString);
        expect(
            searchURI.valueOf()
        ).toEqual("https://buzz.search.windows.net/indexes/foo/docs/suggest?api-version=2016-09-01");
        expect(searchURI.hasQuery("api-version", "2016-09-01")).toBe(true);
    });
    it("should create a suggestions post body from test config, and test suggestions parameters", () => {
        const postBody = uriHelper.buildPostBody(testParameters.suggestionsParameters, testParameters.input, uriHelper.suggestParameterValidator);
        expect(
            postBody
        ).toEqual({
            top: 5,
            fuzzy: false,
            suggesterName: "sg",
            search: "show me the money"
        });

    });
});