export namespace Store {

    export type Config = {
        index: string,
        queryKey: string,
        service: string
        suggestCallback?: (state: Store.SearchState, postBody: { [key: string]: any }) => Promise<any>,
        searchCallback?: (state: Store.SearchState, postBody: { [key: string]: any }) => Promise<any>,
    };

    export type SearchApiVersion = "2016-09-01" | "2015-02-28-Preview";
    export type SearchMode = "any" | "all";
    export type QueryType = "simple" | "full";

    export type SearchParameters = {
        count: boolean,
        top: number,
        skip: number,
        orderby: string,
        searchMode: SearchMode,
        scoringProfile: string,
        select: string,
        searchFields: string,
        minimumCoverage?: string,
        apiVersion: SearchApiVersion,
        queryType: QueryType,
        scoringParameters: string[],
        highlight: string,
        highlightPreTag: string,
        highlightPostTag: string
    };

    export type SearchParametersUpdate = {
        count?: boolean,
        top?: number,
        skip?: number,
        orderby?: string,
        searchMode?: SearchMode,
        scoringProfile?: string,
        select?: string,
        searchFields?: string,
        minimumCoverage?: string,
        apiVersion?: SearchApiVersion,
        queryType?: QueryType,
        scoringParameters?: string[],
        highlight?: string,
        highlightPreTag?: string,
        highlightPostTag?: string
    };

    export type SuggestionsParameters = {
        top: number,
        filter: string,
        orderby: string,
        fuzzy: boolean,
        highlightPreTag: string,
        highlightPostTag: string
        select: string,
        searchFields: string,
        minimumCoverage?: string,
        apiVersion: SearchApiVersion,
        suggesterName: string
    };

    export type SuggestionsParametersUpdate = {
        top?: number,
        filter?: string,
        orderby?: string,
        fuzzy?: boolean,
        highlightPreTag?: string,
        highlightPostTag?: string
        select?: string,
        searchFields?: string,
        minimumCoverage?: string,
        apiVersion?: SearchApiVersion,
        suggesterName?: string
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
        resultsProcessor?: (results: {}[]) => {}[],
        results: {}[]
    };

    export type Suggestions = {
        isFetching: boolean,
        lastUpdated: number,
        suggestionsProcessor?: (suggestions: {}[]) => {}[],
        suggestions: {}[]
    };

    export type CheckboxFacetItem = {
        value: string | number,
        count: number
        selected: boolean
    };

    export type FacetSortingMode = "count" | "count-" | "value" | "value-";

    export type RangeDataType = "number" | "date";

    export type RangeFacet = {
        type: "RangeFacet"
        dataType: RangeDataType,
        key: string,
        min: number | Date,
        max: number | Date,
        filterLowerBound: number | Date,
        filterUpperBound: number | Date,
        lowerBucketCount: number,
        middleBucketCount: number,
        upperBucketCount: number,
        facetClause: string,
        filterClause: string,
    };

    export type CheckboxDataType = "number" | "string" | "collection";

    export type CheckboxFacet = {
        type: "CheckboxFacet"
        dataType: CheckboxDataType
        key: string,
        values: { [key: string]: CheckboxFacetItem }
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
        globalFilters: { [key: string]: string },
        facets: { [key: string]: Facet }
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