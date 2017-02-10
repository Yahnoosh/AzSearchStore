export namespace Store {

    export type Config = {
        index: string,
        queryKey: string,
        service: string
    };

    export type SearchApiVersion = "2016-09-01" | "2015-02-28-Preview";
    export type SearchMode = "any" | "all";

    export type SearchParameters = {
        input: string,
        count: boolean,
        top: number,
        skip: number,
        orderBy: string,
        searchMode: SearchMode,
        scoringProfile: string,
        select: string,
        searchFields: string,
        apiVersion: SearchApiVersion
    };

    export type SearchResults = {
        isFetching: boolean,
        lastUpdated: number,
        results: {}[]
    };

    export type CheckboxFacetItem = {
        value: string,
        count: number
    };

    export type RangeFacet = {
        key: string,
        min: number,
        max: number,
        filterLowerBound: number,
        filterUpperBound: number,
        lowerBucketCount: number,
        middleBucketCount: number,
        upperBucketCount: number
    };

    export type CheckboxFacet = {
        isNumeric: boolean,
        key: string,
        values: CheckboxFacetItem[]
    };

    export type Facet = RangeFacet | CheckboxFacet;

    export type SearchState = {
        config: Config,
        results: SearchResults,
        suggestions: {}[],
        facets: {[key: string]: Facet}
        searchParameters: SearchParameters
    };
}