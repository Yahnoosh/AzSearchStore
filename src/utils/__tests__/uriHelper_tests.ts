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

describe("utils/searchParameters", () => {
    it("should create a uri from test config and default searchParameters", () => {
        const uriString = uriHelper.buildSearchURI(config, searchParameters.initialState);
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
        const uriString = uriHelper.buildSearchURI(config, testParameters);
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
});