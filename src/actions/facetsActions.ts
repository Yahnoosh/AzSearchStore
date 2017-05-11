import { Store } from "../store";

export type FacetsAction =
    AddRangeFacetAction |
    AddCheckboxFacetAction |
    ToggleCheckboxFacetAction |
    SetFacetRangeAction |
    SetFacetModeAction |
    SetFacetsValuesAction |
    UpdateFacetValuesAction |
    ClearFacetsSelectionsAction |
    SetGlobalFilterAction;
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
    dataType: Store.RangeDataType
    key: string,
    min: number | Date,
    max: number | Date
};
export type AddCheckboxFacetAction = {
    type: "ADD_CHECKBOX_FACET"
    key: string,
    dataType: Store.CheckboxDataType,
    count: number,
    sort: Store.FacetSortingMode
};
export type ToggleCheckboxFacetAction = {
    type: "TOGGLE_CHECKBOX_SELECTION",
    key: string,
    value: string | number
};
export type SetFacetRangeAction = {
    type: "SET_FACET_RANGE",
    key: string,
    lowerBound: number | Date,
    upperBound: number | Date
};
export type SetGlobalFilterAction = {
    type: "SET_GLOBAL_FILTER",
    key: string,
    filter: string
};

export const setFacetsValues = (facets: { [key: string]: Store.FacetResult[] }): FacetsAction => ({
    type: "SET_FACETS_VALUES",
    facets
});

export const updateFacetsValues = (facets: { [key: string]: Store.FacetResult[] }): FacetsAction => ({
    type: "UPDATE_FACETS_VALUES",
    facets
});

export const addCheckboxFacet = (key: string, dataType: Store.CheckboxDataType, count: number = 5, sort: Store.FacetSortingMode = "count"): FacetsAction => ({
    type: "ADD_CHECKBOX_FACET",
    key,
    dataType,
    count,
    sort
});

export const addRangeFacet = (key: string, dataType: Store.RangeDataType, min: number | Date, max: number | Date): FacetsAction => ({
    type: "ADD_RANGE_FACET",
    dataType,
    key,
    min,
    max
});

export const setFacetMode = (facetMode: Store.FacetMode): FacetsAction => ({
    type: "SET_FACET_MODE",
    facetMode
});

export const toggleCheckboxFacetSelection = (key: string, value: string | number): FacetsAction => ({
    type: "TOGGLE_CHECKBOX_SELECTION",
    key,
    value
});

export const setFacetRange = (key: string, lowerBound: number | Date, upperBound: number | Date): FacetsAction => ({
    type: "SET_FACET_RANGE",
    key,
    lowerBound,
    upperBound
});

export const clearFacetsSelections = (): FacetsAction => ({ type: "CLEAR_FACETS_SELECTIONS" });

export const setGlobalFilter = (key: string, filter: string): FacetsAction => ({ type: "SET_GLOBAL_FILTER", key, filter });