import { FacetsAction, SetFacetRangeAction, ToggleCheckboxFacetAction, AddCheckboxFacetAction, AddRangeFacetAction, SetFacetModeAction }
    from "../actions/facetsActions";
import { Store } from "../store";
import * as objectAssign from "object-assign";
import { updateObject, updateObjectAtKey } from "./reducerUtils";

export const initialState: Store.Facets = {
    facetMode: "simple",
    facets: {}
};

export function facets(state: Store.Facets = initialState, action: FacetsAction): Store.Facets {
    let newFacets: { [key: string]: Store.Facet } = {};
    const initialFacets = state.facets;
    switch (action.type) {
        case "SET_FACET_MODE": return setFacetMode(state, action);
        case "ADD_RANGE_FACET": return addRangeFacetAction(state, action);
        case "ADD_CHECKBOX_FACET": return addCheckboxFacet(state, action);
        case "TOGGLE_CHECKBOX_SELECTION": return toggleFacetSelection(state, action);
        case "SET_FACET_RANGE": return setFacetRange(state, action);
        default:
            return state;
    }
}

function setFacetMode(state: Store.Facets, action: SetFacetModeAction): Store.Facets {
    const { facetMode } = action;
    return updateObject(state, { facetMode });
}

function addRangeFacetAction(state: Store.Facets, action: AddRangeFacetAction): Store.Facets {
    let { key, min, max } = action;
    const filterLowerBound = min,
        filterUpperBound = max;
    const rangeFacet: Store.RangeFacet = {
        type: "RangeFacet",
        key,
        min,
        max,
        filterLowerBound: min,
        filterUpperBound: max,
        lowerBucketCount: 0,
        middleBucketCount: 0,
        upperBucketCount: 0,
        filterClause: "",
        facetClause: `${key},values:${filterLowerBound}|${filterUpperBound}`
    };
    const facets = updateObjectAtKey(state.facets, rangeFacet, key);
    return updateObject(state, { facets });
}

function addCheckboxFacet(state: Store.Facets, action: AddCheckboxFacetAction): Store.Facets {
    const { isNumeric, key } = action;
    const sort = "count",
        count = 5;
    const checkFacet: Store.CheckboxFacet = {
        type: "CheckboxFacet",
        key,
        isNumeric,
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
    const values = updateObjectAtKey(checkboxFacet.values, updatedFacetItem, value);
    const newFacet = updateObject(checkboxFacet, { values });
    const filterClause = buildCheckboxFilter(newFacet);
    const newFacetWithFilter = updateObject(newFacet, { filterClause });
    const facets = updateObjectAtKey(state.facets, newFacetWithFilter, key);
    return updateObject(state, { facets });
}

function setFacetRange(state: Store.Facets, action: SetFacetRangeAction): Store.Facets {
    const { key, lowerBound, upperBound} = action;
    const existingFacet = state.facets[key];
    if (existingFacet.type !== "RangeFacet") {
        throw new Error(`SET_FACET_RANGE must be called on facet of type 'RangeFacet', actual: ${existingFacet.type}`);
    }
    const existingRangeFacet = existingFacet as Store.RangeFacet;
    const newRangeFacet = updateObject(existingRangeFacet, { filterLowerBound: lowerBound, filterUpperBound: upperBound });
    const filter = buildRangeFilter(newRangeFacet);
    const newFacetWithFilter = updateObject(newRangeFacet, { filterClause: filter });
    const facets = updateObjectAtKey(state.facets, newFacetWithFilter, key);
    return updateObject(state, { facets });
}

function buildCheckboxFilter(facet: Store.CheckboxFacet): string {
    const selectedFacets = Object.keys(facet.values).filter((value) => {
        return facet.values[value].selected;
    });

    let clauses = selectedFacets.map((selectedValue) => {
        if (facet.isNumeric) {
            return `${facet.key} eq ${facet.values[selectedValue].value}`;
        }
        else {
            return `${facet.key} eq '${facet.values[selectedValue].value}'`;
        }
    });

    let filter = clauses.join(" or ");
    filter.length ? filter = `(${filter})` : filter = "";
    return filter;
}

function buildRangeFilter(facet: Store.RangeFacet): string {
    if (facet.min === facet.filterLowerBound && facet.max === facet.filterUpperBound) {
        return "";
    }
    if (facet.min === facet.filterLowerBound) {
        return `${facet.key} le ${facet.filterUpperBound}`;
    }
    if (facet.max === facet.filterUpperBound) {
        return `${facet.key} ge ${facet.filterLowerBound}`;
    }

    return `${facet.key} ge ${facet.filterLowerBound} and ${facet.key} le ${facet.filterUpperBound}`;
}