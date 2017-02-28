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
        selected: boolean
    };

    export type FacetSortingMode = "count" | "count-" | "value" | "value-";

    export type RangeFacet = {
        type: "RangeFacet"
        key: string,
        min: number,
        max: number,
        filterLowerBound: number,
        filterUpperBound: number,
        lowerBucketCount: number,
        middleBucketCount: number,
        upperBucketCount: number,
        facetClause: string,
        filterClause: string,
    };

    export type CheckboxFacet = {
        type: "CheckboxFacet"
        isNumeric: boolean,
        key: string,
        values: {[key: string]: CheckboxFacetItem}
        count: number,
        sort: FacetSortingMode
        facetClause: string,
        filterClause: string,
    };

    export type FacetMode = "simple" | "advanced";

    export type Facets = {
        facetMode: FacetMode,
        facets: {[key: string]: Facet}
    };

    export type Facet = RangeFacet | CheckboxFacet;

    export type SearchState = {
        config: Config,
        results: SearchResults,
        suggestions: {}[],
        facets: Facets
        searchParameters: SearchParameters
    };
}