import * as URI from "urijs";
import { Store } from "../store";

const parameterNameLookup = {
    input: "search",
    count: "$count",
    orderBy: "$orderby",
    scoringProfile: "scoringProfile",
    searchMode: "searchMode",
    searchFields: "searchFields",
    select: "$select",
    skip: "$skip",
    top: "$top",
    apiVersion: "api-version",
    facet: "facet",
    filter: "$filter",
    minimumCoverage: "minimumCoverage",
    fuzzy: "fuzzy",
    highlightPostTag: "highlightPostTag",
    highlightPreTag: "highlightPreTag",
    queryType: "queryType"
};

function appendQueryParams(searchURI: uri.URI, parameters: Store.Parameters, facets: Store.Facets): uri.URI {
    const searchParameters = parameters.searchParameters;
    let params: { [id: string]: string | string[] | boolean | number } = {};
    params[parameterNameLookup.input] = parameters.input;
    params[parameterNameLookup.apiVersion] = searchParameters.apiVersion;
    params[parameterNameLookup.skip] = searchParameters.skip;
    params[parameterNameLookup.top] = searchParameters.top;
    params[parameterNameLookup.searchMode] = searchParameters.searchMode;
    searchParameters.count ? params[parameterNameLookup.count] = searchParameters.count : 0;
    searchParameters.orderby ? params[parameterNameLookup.orderBy] = searchParameters.orderby : 0;
    searchParameters.scoringProfile ? params[parameterNameLookup.scoringProfile] = searchParameters.scoringProfile : 0;
    searchParameters.searchFields ? params[parameterNameLookup.searchFields] = searchParameters.searchFields : 0;
    searchParameters.select ? params[parameterNameLookup.select] = searchParameters.select : 0;
    searchParameters.minimumCoverage ? params[parameterNameLookup.minimumCoverage] = searchParameters.minimumCoverage : 0;
    searchParameters.queryType ? params[parameterNameLookup.queryType] = searchParameters.queryType : 0;
    const facetClauses = getFacetClauses(facets);
    facetClauses ? params[parameterNameLookup.facet] = facetClauses : 0;
    const filter = getFilterClauses(facets);
    filter ? params[parameterNameLookup.filter] = filter : 0;
    searchURI.addQuery(params);
    return searchURI;
}


export function buildSuggestionsPostBody(parameters: Store.Parameters): { [key: string]: any } {
    if (!parameters.suggestionsParameters.suggesterName) {
        throw new Error("Parameter 'suggesterName' is required to generate valid suggest api request");
    }
    const suggestionsParameters = parameters.suggestionsParameters as { [key: string]: any };
    let params: { [id: string]: string | string[] | boolean | number } = {};
    Object.keys(suggestionsParameters).forEach((parameter) => {
        const value = suggestionsParameters[parameter];
        value && parameter !== "apiVersion" ? params[parameter] = value : 0;
    });
    params["search"] = parameters.input;
    return params;
}


function getFilterClauses(facets: Store.Facets): string {
    let filteredFacets = Object.keys(facets.facets).filter((key) => {
        return facets.facets[key].filterClause.length > 0;
    });
    let filters = filteredFacets.map((key) => {
        return facets.facets[key].filterClause;
    });
    return filters.join(" and ");
}

function getFacetClauses(facets: Store.Facets): string[] {
    const facetKeys = Object.keys(facets.facets);
    let clauses: string[] = facetKeys.map((facetKey) => {
        return facets.facets[facetKey].facetClause;
    });
    return clauses;
}


export function buildSearchURI(config: Store.Config, parameters: Store.Parameters, facets: Store.Facets): string {
    const {service, index} = config;
    const uriTemplate = `https://${service}.search.windows.net/indexes/${index}/docs`;
    let searchURI = URI(uriTemplate);
    searchURI = appendQueryParams(searchURI, parameters, facets);
    return searchURI.valueOf();
}

export function buildSuggestionsURI(config: Store.Config, parameters: Store.Parameters): string {
    const {service, index} = config;
    const apiVersion = parameters.suggestionsParameters.apiVersion;
    const uriTemplate = `https://${service}.search.windows.net/indexes/${index}/docs/suggest?api-version=${apiVersion}`;
    let searchURI = URI(uriTemplate);
    return searchURI.valueOf();
}