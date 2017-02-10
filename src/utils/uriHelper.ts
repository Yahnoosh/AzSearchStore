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
    apiVersion: "api-version"
};

function appendQueryParams(searchURI: uri.URI, parameters: Store.SearchParameters): uri.URI {
    let params: { [id: string]: string | boolean | number } = {};
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
    searchURI.addQuery(params);
    return searchURI;
}
export function buildSearchURI(config: Store.Config, parameters: Store.SearchParameters): string {
    const {service, index} = config;
    const uriTemplate = `https://${service}.search.windows.net/indexes/${index}/docs`;
    let searchURI = URI(uriTemplate);
    searchURI = appendQueryParams(searchURI, parameters);
    return searchURI.valueOf();
}