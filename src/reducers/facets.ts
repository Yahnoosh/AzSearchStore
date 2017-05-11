import {
    FacetsAction, SetFacetRangeAction, ToggleCheckboxFacetAction,
    AddCheckboxFacetAction, AddRangeFacetAction, SetFacetModeAction,
    SetFacetsValuesAction, UpdateFacetValuesAction, ClearFacetsSelectionsAction,
    SetGlobalFilterAction
}
    from "../actions/facetsActions";
import { Store } from "../store";
import * as objectAssign from "object-assign";
import { updateObject, updateObjectAtKey } from "./reducerUtils";

export const initialState: Store.Facets = {
    facetMode: "simple",
    globalFilters: {},
    facets: {}
};

const odataString = "@odata";

export function facets(state: Store.Facets = initialState, action: FacetsAction): Store.Facets {
    switch (action.type) {
        case "SET_FACET_MODE": return setFacetMode(state, action);
        case "ADD_RANGE_FACET": return addRangeFacetAction(state, action);
        case "ADD_CHECKBOX_FACET": return addCheckboxFacet(state, action);
        case "TOGGLE_CHECKBOX_SELECTION": return toggleFacetSelection(state, action);
        case "SET_FACET_RANGE": return setFacetRange(state, action);
        case "SET_FACETS_VALUES": return setFacetsValues(state, action);
        case "UPDATE_FACETS_VALUES": return updateFacetsValues(state, action);
        case "CLEAR_FACETS_SELECTIONS": return clearFacetsSelections(state, action);
        case "SET_GLOBAL_FILTER": return setGlobalFilter(state, action);
        default:
            return state;
    }
}

function setGlobalFilter(state: Store.Facets, action: SetGlobalFilterAction): Store.Facets {
    const { filter, key } = action;
    const globalFilters = updateObjectAtKey(state.globalFilters, filter, key);
    return updateObject(state, { globalFilters });
}

function clearFacetsSelections(state: Store.Facets, action: ClearFacetsSelectionsAction): Store.Facets {
    let facets: { [key: string]: Store.Facet } = {};
    Object.keys(state.facets).forEach((key) => {
        const facet = state.facets[key];
        switch (facet.type) {
            case "CheckboxFacet":
                const values: { [key: string]: Store.CheckboxFacetItem } = {};
                Object.keys(facet.values).forEach((value) => {
                    const currentItem = facet.values[value];
                    const item = updateObject(currentItem, { selected: false, count: 0 });
                    values[value] = item;
                });
                facets[key] = updateObject(facet, { values, filterClause: "" });
                break;
            case "RangeFacet":
                facets[key] = updateObject(facet,
                    {
                        filterLowerBound: facet.min,
                        filterUpperBound: facet.max,
                        lowerBucketCount: 0,
                        middleBucketCount: 0,
                        upperBucketCount: 0,
                        filterClause: ""
                    }
                );
                break;
            default: break;
        }
    });
    return updateObject(state, { facets });
}

function setFacetsValues(state: Store.Facets, action: SetFacetsValuesAction): Store.Facets {
    let facets: { [key: string]: Store.Facet } = {};
    const keysToUpdate = Object.keys(action.facets).filter((key) => {
        const facet = state.facets[key];
        return facet;
    });
    keysToUpdate.forEach((key) => {
        const facet = state.facets[key];
        const facetResults: Store.FacetResult[] = action.facets[key];
        switch (facet.type) {
            case "CheckboxFacet":
                facets[key] = setCheckboxFacetValues(facet as Store.CheckboxFacet, facetResults);
                break;
            case "RangeFacet":
                facets[key] = setRangeFacetValues(facet as Store.RangeFacet, facetResults);
                break;
            default: break;
        }
    });
    return updateObject(state, { facets });
}

function setRangeFacetValues(facet: Store.RangeFacet, facetResults: Store.FacetResult[]): Store.RangeFacet {
    return updateObject(facet,
        {
            filterLowerBound: facet.min,
            filterUpperBound: facet.max,
            lowerBucketCount: 0,
            upperBucketCount: 0,
            middleBucketCount: facetResults[1].count,
            filterClause: ""
        });
}

function setCheckboxFacetValues(facet: Store.CheckboxFacet, facetResults: Store.FacetResult[]): Store.CheckboxFacet {
    let values: { [key: string]: Store.CheckboxFacetItem } = {};
    facetResults.forEach((facetResult) => {
        const { value, count } = facetResult;
        values[value] = {
            value,
            count,
            selected: false
        };
    });
    return updateObject(facet, { values, filterClause: "" });
}

function updateFacetsValues(state: Store.Facets, action: UpdateFacetValuesAction): Store.Facets {
    const updatedFacets: { [key: string]: Store.Facet } = {};
    // filter out @odata type annotations
    const keys = Object.keys(action.facets).filter((key) => { return key.toLowerCase().indexOf(odataString) < 0; });
    keys.forEach((key) => {
        let facet = state.facets[key];
        const currentItem = action.facets[key];
        switch (facet.type) {
            case "RangeFacet":
                updatedFacets[key] = updateObject(facet, {
                    lowerBucketCount: currentItem[0].count,
                    middleBucketCount: currentItem[1].count,
                    upperBucketCount: currentItem[2].count
                });
                break;
            case "CheckboxFacet":
                // set counts for values that got updates
                const checkboxFacet = facet as Store.CheckboxFacet;
                const hasSelection = facet.filterClause.length > 0;
                const updatedFacet: Store.CheckboxFacet = hasSelection ? mergeCheckboxFacetValues(checkboxFacet, currentItem) : setCheckboxFacetValues(checkboxFacet, currentItem);
                updatedFacets[key] = updatedFacet;
                break;
            default: break;
        }
    });
    const facets = updateObject(state.facets, updatedFacets);
    return updateObject(state, { facets });
}

function mergeCheckboxFacetValues(facet: Store.CheckboxFacet, facetResults: Store.FacetResult[]): Store.CheckboxFacet {
    let values: { [key: string]: Store.CheckboxFacetItem } = {};
    const currentItemKeys = facetResults.map((item) => { return item.value.toString(); });

    Object.keys(facet.values).forEach((valueKey) => {
        // do we have an update for the current key
        const updateIndex = currentItemKeys.indexOf(valueKey);
        if (updateIndex >= 0) {
            const item = facetResults[updateIndex];
            values[valueKey] = {
                count: item.count,
                value: item.value,
                selected: facet.values[item.value] ? facet.values[item.value].selected : false
            };
        }
        else {
            const value = facet.values[valueKey];
            values[valueKey] = {
                count: 0,
                selected: value.selected,
                value: value.value
            };
        }
    });

    // fill in new values at the end
    facetResults.forEach((item) => {
        if (!values[item.value]) {
            values[item.value] = {
                count: item.count,
                value: item.value,
                selected: facet.values[item.value] ? facet.values[item.value].selected : false
            };
        }
    });

    return updateObject(facet, { values });
}

function setFacetMode(state: Store.Facets, action: SetFacetModeAction): Store.Facets {
    const { facetMode } = action;
    return updateObject(state, { facetMode });
}

function getRangeFacetClause(dataType: Store.RangeDataType, key: string, filterLowerBound: number | Date, filterUpperBound: number | Date): string {
    let lowerClause;
    let upperClause;
    switch (dataType) {
        case "number":
            lowerClause = filterLowerBound;
            upperClause = filterUpperBound;
            break;
        case "date":
            lowerClause = (filterLowerBound as Date).toISOString();
            upperClause = (filterUpperBound as Date).toISOString();
            break;
        default:
            break;
    }
    return `${key},values:${lowerClause}|${upperClause}`;
}

function addRangeFacetAction(state: Store.Facets, action: AddRangeFacetAction): Store.Facets {
    let { key, min, max, dataType } = action;

    switch (dataType) {
        case "number":
        case "date":
            break;
        default:
            throw new Error("dataType of RangeFacet must be 'number' | 'date'");
    }

    const filterLowerBound = min,
        filterUpperBound = max;

    const rangeFacet: Store.RangeFacet = {
        type: "RangeFacet",
        dataType,
        key,
        min,
        max,
        filterLowerBound: min,
        filterUpperBound: max,
        lowerBucketCount: 0,
        middleBucketCount: 0,
        upperBucketCount: 0,
        filterClause: "",
        facetClause: getRangeFacetClause(dataType, key, filterLowerBound, filterUpperBound)
    };
    const facets = updateObjectAtKey(state.facets, rangeFacet, key);
    return updateObject(state, { facets });
}

function addCheckboxFacet(state: Store.Facets, action: AddCheckboxFacetAction): Store.Facets {
    const { dataType, key } = action;
    const sort = "count",
        count = 5;

    switch (dataType) {
        case "number":
        case "collection":
        case "string":
            break;
        default:
            throw new Error("dataType of CheckboxFacet must be 'number' | 'collection' | 'string'");
    }
    const checkFacet: Store.CheckboxFacet = {
        type: "CheckboxFacet",
        key,
        dataType,
        values: {},
        count,
        sort,
        filterClause: "",
        facetClause: `${key},count:${count},sort:${sort}`
    };
    const facets = updateObjectAtKey(state.facets, checkFacet, key);
    return updateObject(state, { facets });
}

function toggleFacetSelection(state: Store.Facets, action: ToggleCheckboxFacetAction): Store.Facets {
    const { key, value } = action;
    const existingFacet = state.facets[key];
    if (existingFacet.type !== "CheckboxFacet") {
        throw new Error(`TOGGLE_CHECKBOX_SELECTION must be called on facet of type 'CheckboxFacet', actual: ${existingFacet.type}`);
    }
    const checkboxFacet = existingFacet as Store.CheckboxFacet;
    const oldFacetItem = checkboxFacet.values[value];
    const updatedFacetItem = updateObject(oldFacetItem, { selected: !oldFacetItem.selected });
    const newValue: { [key: string]: Store.CheckboxFacetItem } = {};
    const values = updateObjectAtKey(checkboxFacet.values, updatedFacetItem, value.toString());
    const newFacet = updateObject(checkboxFacet, { values });
    const filterClause = buildCheckboxFilter(newFacet);
    const newFacetWithFilter = updateObject(newFacet, { filterClause });
    const facets = updateObjectAtKey(state.facets, newFacetWithFilter, key);
    return updateObject(state, { facets });
}

function setFacetRange(state: Store.Facets, action: SetFacetRangeAction): Store.Facets {
    const { key, lowerBound, upperBound } = action;
    const existingFacet = state.facets[key];
    if (existingFacet.type !== "RangeFacet") {
        throw new Error(`SET_FACET_RANGE must be called on facet of type 'RangeFacet', actual: ${existingFacet.type}`);
    }
    const existingRangeFacet = existingFacet as Store.RangeFacet;
    const newRangeFacet = updateObject(existingRangeFacet, { filterLowerBound: lowerBound, filterUpperBound: upperBound });
    const filter = buildRangeFilter(newRangeFacet);
    const facetClause = getRangeFacetClause(newRangeFacet.dataType, newRangeFacet.key, lowerBound, upperBound);
    const newFacetWithFilter = updateObject(newRangeFacet, { filterClause: filter, facetClause });
    const facets = updateObjectAtKey(state.facets, newFacetWithFilter, key);
    return updateObject(state, { facets });
}

function buildCheckboxFilter(facet: Store.CheckboxFacet): string {
    const selectedFacets = Object.keys(facet.values).filter((value) => {
        return facet.values[value].selected;
    });

    let clauses = selectedFacets.map((selectedValue) => {
        let clause;
        switch (facet.dataType) {
            case "number":
                clause = `${facet.key} eq ${facet.values[selectedValue].value}`;
                break;
            case "string":
                clause = `${facet.key} eq '${facet.values[selectedValue].value}'`;
                break;
            case "collection":
                clause = `${facet.key}/any(t: t eq '${facet.values[selectedValue].value}')`;
                break;
            default:
                clause = "";
                break;
        }

        return clause;
    });

    let filter = clauses.join(" or ");
    filter.length ? filter = `(${filter})` : filter = "";
    return filter;
}

function buildRangeFilter(facet: Store.RangeFacet): string {
    let lowerFilter;
    let upperFilter;
    switch (facet.dataType) {
        case "number":
            lowerFilter = facet.filterLowerBound;
            upperFilter = facet.filterUpperBound;
            break;
        case "date":
            lowerFilter = (facet.filterLowerBound as Date).toISOString();
            upperFilter = (facet.filterUpperBound as Date).toISOString();
            break;
        default:
            break;
    }

    if (facet.min === facet.filterLowerBound && facet.max === facet.filterUpperBound) {
        return "";
    }
    if (facet.min === facet.filterLowerBound) {
        return `${facet.key} le ${upperFilter}`;
    }
    if (facet.max === facet.filterUpperBound) {
        return `${facet.key} ge ${lowerFilter}`;
    }

    return `${facet.key} ge ${lowerFilter} and ${facet.key} le ${upperFilter}`;
}