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
    filter: "$filter"
};

function appendQueryParams(searchURI: uri.URI, parameters: Store.SearchParameters, facets: Store.Facets): uri.URI {
    let params: { [id: string]: string | string[] | boolean | number } = {};
    params[parameterNameLookup.input] = parameters.input;
    params[parameterNameLookup.apiVersion] = parameters.apiVersion;
    params[parameterNameLookup.skip] = parameters.skip;
    params[parameterNameLookup.top] = parameters.top;
    params[parameterNameLookup.searchMode] = parameters.searchMode;
    parameters.count ? params[parameterNameLookup.count] = parameters.count : 0;
    parameters.orderBy ? params[parameterNameLookup.orderBy] = parameters.orderBy : 0;
    parameters.scoringProfile ? params[parameterNameLookup.scoringProfile] = parameters.scoringProfile : 0;
    parameters.searchFields ? params[parameterNameLookup.searchFields] = parameters.searchFields : 0;
    parameters.select ? params[parameterNameLookup.select] = parameters.select : 0;
    const facetClauses = getFacetClauses(facets);
    facetClauses ? params[parameterNameLookup.facet] = facetClauses : 0;
    const filter = getFilterClauses(facets);
    filter ? params[parameterNameLookup.filter] = filter : 0;
    searchURI.addQuery(params);
    return searchURI;
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


export function buildSearchURI(config: Store.Config, parameters: Store.SearchParameters, facets: Store.Facets): string {
    const {service, index} = config;
    const uriTemplate = `https://${service}.search.windows.net/indexes/${index}/docs`;
    let searchURI = URI(uriTemplate);
    searchURI = appendQueryParams(searchURI, parameters, facets);
    return searchURI.valueOf();
}