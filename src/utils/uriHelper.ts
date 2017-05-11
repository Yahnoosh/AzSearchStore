import * as URI from "urijs";
import { Store } from "../store";

export function searchParameterValidator(parameters: Store.SearchParameters): void {
    // todo validate params
}

export function suggestParameterValidator(parameters: Store.SuggestionsParameters): void {
    if (!parameters.suggesterName) {
        throw new Error("Parameter 'suggesterName' is required to generate valid suggest api request");
    }
}

export function buildPostBody(parameters: Store.SearchParameters | Store.SuggestionsParameters, input: string, validator: (parameters: Store.SearchParameters | Store.SuggestionsParameters) => void, facets?: Store.Facets): { [key: string]: any } {
    validator(parameters);
    const parameterMap = parameters as { [key: string]: any };
    let params: { [id: string]: string | string[] | boolean | number } = {};
    Object.keys(parameterMap).forEach((parameter) => {
        const value = parameterMap[parameter];
        !(value == null) && parameter !== "apiVersion" ? params[parameter] = value : 0;
    });
    if (facets) {
        const facetClauses = getFacetClauses(facets);
        facetClauses ? params["facets"] = facetClauses : 0;
        const filter = getFilterClauses(facets);
        filter ? params["filter"] = filter : 0;
    }
    params["search"] = input;
    return params;
}


function getFilterClauses(facets: Store.Facets): string {
    let filteredFacets = Object.keys(facets.facets).filter((key) => {
        return facets.facets[key].filterClause.length > 0;
    });
    let filters = filteredFacets.map((key) => {
        return facets.facets[key].filterClause;
    });
    const globalFilter = getGlobalFilter(facets.globalFilters);
    if (globalFilter) {
        filters.push(globalFilter);
    }
    return filters.join(" and ");
}

function getGlobalFilter(globalFilters: { [key: string]: string }): string {
    let filters = Object.keys(globalFilters).filter((key) => {
        return globalFilters[key];
    }).map((key) => { return globalFilters[key]; });

    return filters.join(" and ");
}

function getFacetClauses(facets: Store.Facets): string[] {
    const facetKeys = Object.keys(facets.facets);
    let clauses: string[] = facetKeys.map((facetKey) => {
        return facets.facets[facetKey].facetClause;
    });
    clauses = clauses.length ? clauses : null;
    return clauses;
}


export function buildSearchURI(config: Store.Config, parameters: Store.Parameters): string {
    const { service, index } = config;
    const apiVersion = parameters.searchParameters.apiVersion;
    const uriTemplate = `https://${service}.search.windows.net/indexes/${index}/docs/search?api-version=${apiVersion}`;
    let searchURI = URI(uriTemplate);
    return searchURI.valueOf();
}

export function buildSuggestionsURI(config: Store.Config, parameters: Store.Parameters): string {
    const { service, index } = config;
    const apiVersion = parameters.suggestionsParameters.apiVersion;
    const uriTemplate = `https://${service}.search.windows.net/indexes/${index}/docs/suggest?api-version=${apiVersion}`;
    let searchURI = URI(uriTemplate);
    return searchURI.valueOf();
}