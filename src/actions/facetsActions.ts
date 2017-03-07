import { Store } from "../store";

export type FacetsAction =
    AddRangeFacetAction |
    AddCheckboxFacetAction |
    ToggleCheckboxFacetAction |
    SetFacetRangeAction |
    SetFacetModeAction |
    SetFacetsValuesAction |
    UpdateFacetValuesAction |
    ClearFacetsSelectionsAction;
export type ClearFacetsSelectionsAction = {
    type: "CLEAR_FACETS_SELECTIONS",
};
export type UpdateFacetValuesAction = {
    type: "UPDATE_FACETS_VALUES",
    facets: { [key: string]: Store.FacetResult[] }
};
export type SetFacetsValuesAction = {
    type: "SET_FACETS_VALUES",
    facets: { [key: string]: Store.FacetResult[] }
};
export type SetFacetModeAction = {
    type: "SET_FACET_MODE",
    facetMode: Store.FacetMode
};
export type AddRangeFacetAction = {
    type: "ADD_RANGE_FACET"
    key: string,
    min: number,
    max: number
};
export type AddCheckboxFacetAction = {
    type: "ADD_CHECKBOX_FACET"
    key: string,
    isNumeric: boolean,
    count: number,
    sort: Store.FacetSortingMode
};
export type ToggleCheckboxFacetAction = {
    type: "TOGGLE_CHECKBOX_SELECTION",
    key: string,
    value: string
};
export type SetFacetRangeAction = {
    type: "SET_FACET_RANGE",
    key: string,
    lowerBound: number,
    upperBound: number
};

export const setFacetsValues = (facets: { [key: string]: Store.FacetResult[] }): FacetsAction => ({
    type: "SET_FACETS_VALUES",
    facets
});

export const updateFacetsValues = (facets: { [key: string]: Store.FacetResult[] }): FacetsAction => ({
    type: "UPDATE_FACETS_VALUES",
    facets
});

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

export const toggleCheckboxFacetSelection = (key: string, value: string): FacetsAction => ({
    type: "TOGGLE_CHECKBOX_SELECTION",
    key,
    value
});

export const setFacetRange = (key: string, lowerBound: number, upperBound: number): FacetsAction => ({
    type: "SET_FACET_RANGE",
    key,
    lowerBound,
    upperBound
});

export const clearFacetsSelections = (): FacetsAction => ({ type: "CLEAR_FACETS_SELECTIONS" });