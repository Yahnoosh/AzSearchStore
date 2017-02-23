import { Store } from "../store";

export type FacetsAction =
    {
        type: "ADD_RANGE_FACET"
        key: string,
        min: number,
        max: number
    } |
    {
        type: "ADD_CHECKBOX_FACET"
        key: string,
        isNumeric: boolean,
        count: number,
        sort: Store.FacetSortingMode
    } |
    {
        type: "SET_FACET_MODE",
        facetMode: Store.FacetMode
    };

export const addCheckboxFacet = (key: string, isNumeric: boolean, count: number = 5, sort: Store.FacetSortingMode = "count"): FacetsAction => ({
    type: "ADD_CHECKBOX_FACET",
    key,
    isNumeric,
    count,
    sort
});

export const addRangeFacet = (key: string, min: number, max: number): FacetsAction => ({
    type: "ADD_RANGE_FACET",
    key,
    min,
    max
});

export const setFacetMode = (facetMode: Store.FacetMode): FacetsAction => ({
    type: "SET_FACET_MODE",
    facetMode
});