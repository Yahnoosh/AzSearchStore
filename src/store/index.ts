export namespace Store {

    export type Config = {
        index: string,
        queryKey: string,
        service: string
    };

    export type SearchApiVersion = "2016-09-01" | "2015-02-28-Preview";
    export type SearchMode = "any" | "all";
    export type QueryType = "simple" | "full";

    export type SearchParameters = {
        count: boolean,
        top: number,
        skip: number,
        orderBy: string,
        searchMode: SearchMode,
        scoringProfile: string,
        select: string,
        searchFields: string,
        minimumCoverage?: string,
        apiVersion: SearchApiVersion,
        queryType: QueryType
    };

    export type SearchParametersUpdate = {
        count?: boolean,
        top?: number,
        skip?: number,
        orderBy?: string,
        searchMode?: SearchMode,
        scoringProfile?: string,
        select?: string,
        searchFields?: string,
        minimumCoverage?: string,
        apiVersion?: SearchApiVersion,
        queryType?: QueryType
    };

    export type SuggestionsParameters = {
        top: number,
        filter: string,
        orderBy: string,
        fuzzy: boolean,
        highlightPreTag: string,
        highlightPostTag: string
        select: string,
        searchFields: string,
        minimumCoverage?: string,
        apiVersion: SearchApiVersion
    };

    export type SuggestionsParametersUpdate = {
        top?: number,
        filter?: string,
        orderBy?: string,
        fuzzy?: boolean,
        highlightPreTag?: string,
        highlightPostTag?: string
        select?: string,
        searchFields?: string,
        minimumCoverage?: string,
        apiVersion?: SearchApiVersion
    };

    export type Parameters = {
        searchParameters: SearchParameters,
        suggestionsParameters: SuggestionsParameters,
        input: string
    };

    export type SearchResults = {
        count: number,
        isFetching: boolean,
        lastUpdated: number,
        results: {}[]
    };

    export type Suggestions = {
        isFetching: boolean,
        lastUpdated: number,
        suggestions: {}[]
    };

    export type CheckboxFacetItem = {
        value: string | number,
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

    export type FacetResult = {
        count: number,
        // for bucketed facets
        value?: string | number,
        // for range facets
        from?: number,
        to?: number
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
        suggestions: Suggestions,
        facets: Facets
        parameters: Parameters
    };
}