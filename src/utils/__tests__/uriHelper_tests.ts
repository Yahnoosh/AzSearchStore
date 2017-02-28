import * as searchParameters from "../../reducers/searchParameters";
import { Store } from "../../store";
import * as uriHelper from "../uriHelper";
import * as URI from "urijs";

const config: Store.Config = {
    index: "foo",
    queryKey: "bar",
    service: "buzz"
};

const testParameters: Store.SearchParameters = {
    input: "show me the money",
    apiVersion: "2015-02-28-Preview",
    count: true,
    orderBy: "foobar",
    scoringProfile: "abc",
    searchFields: "def",
    searchMode: "all",
    select: "hij",
    skip: 1000,
    top: 3,
};

const initFacets: Store.Facets = {
    facetMode: "simple",
    facets: {}
};

const testFacets: Store.Facets = {
    facetMode: "simple",
    facets: {
        foo: {
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
        },
        bar: {
            type: "CheckboxFacet",
            key: "foo",
            isNumeric: false,
            values: {},
            count: 5,
            sort: "count",
            filterClause: "",
            facetClause: "bar,count:5,sort:count"
        }
    }
};

describe("utils/searchParameters", () => {
    it("should create a uri from test config and default searchParameters", () => {
        const uriString = uriHelper.buildSearchURI(config, searchParameters.initialState, initFacets);
        const searchURI = URI(uriString);
        expect(
            searchURI.valueOf()
        ).toEqual("https://buzz.search.windows.net/indexes/foo/docs?search=%2A&api-version=2016-09-01&%24skip=0&%24top=50&searchMode=any");
        expect(searchURI.hasQuery("search", "*")).toBe(true);
        expect(searchURI.hasQuery("api-version", "2016-09-01")).toBe(true);
        expect(searchURI.hasQuery("searchMode", "any")).toBe(true);
        expect(searchURI.hasQuery("$top", 50)).toBe(true);
        expect(searchURI.hasQuery("$skip", 0)).toBe(true);
    });
    it("should create a uri from test config and custom searchParameters", () => {
        const uriString = uriHelper.buildSearchURI(config, testParameters, initFacets);
        const searchURI = URI(uriString);
        expect(
            searchURI.valueOf()
        ).toEqual("https://buzz.search.windows.net/indexes/foo/docs?search=show+me+the+money&api-version=2015-02-28-Preview&%24skip=1000&%24top=3&searchMode=all&%24count=true&%24orderby=foobar&scoringProfile=abc&searchFields=def&%24select=hij");
        expect(searchURI.hasQuery("search", "show me the money")).toBe(true);
        expect(searchURI.hasQuery("api-version", "2015-02-28-Preview")).toBe(true);
        expect(searchURI.hasQuery("searchMode", "all")).toBe(true);
        expect(searchURI.hasQuery("$top", 3)).toBe(true);
        expect(searchURI.hasQuery("$skip", 1000)).toBe(true);
        expect(searchURI.hasQuery("$count", true)).toBe(true);
        expect(searchURI.hasQuery("$orderby", "foobar")).toBe(true);
        expect(searchURI.hasQuery("scoringProfile", "abc")).toBe(true);
        expect(searchURI.hasQuery("searchFields", "def")).toBe(true);
        expect(searchURI.hasQuery("$select", "hij")).toBe(true);
    });
    it("should create a uri from test config, default searchParameters and custom facets", () => {
        const uriString = uriHelper.buildSearchURI(config, searchParameters.initialState, testFacets);
        const searchURI = URI(uriString);
        expect(
            searchURI.valueOf()
        ).toEqual("https://buzz.search.windows.net/indexes/foo/docs?search=%2A&api-version=2016-09-01&%24skip=0&%24top=50&searchMode=any&facet=foo%2Cvalues%3A0%7C10&facet=bar%2Ccount%3A5%2Csort%3Acount");
        expect(searchURI.hasQuery("search", "*")).toBe(true);
        expect(searchURI.hasQuery("api-version", "2016-09-01")).toBe(true);
        expect(searchURI.hasQuery("searchMode", "any")).toBe(true);
        expect(searchURI.hasQuery("$top", 50)).toBe(true);
        expect(searchURI.hasQuery("$skip", 0)).toBe(true);
        expect(searchURI.hasQuery("facet", "foo,values:0|10", true)).toBe(true);
        expect(searchURI.hasQuery("facet", "bar,count:5,sort:count", true)).toBe(true);
    });
});