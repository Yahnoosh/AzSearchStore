import { FacetsAction } from "../actions/facetsActions";
import { Store } from "../store";
import * as objectAssign from "object-assign";

export const initialState: Store.Facets = {
    facetMode: "simple",
    facets: {}
};

export function facets(state: Store.Facets = initialState, action: FacetsAction): Store.Facets {
    let newFacets:  {[key: string]: Store.Facet} = {};
    const initialFacets = state.facets;
    switch (action.type) {
        case "SET_FACET_MODE":
            return objectAssign({}, state, { facetMode: action.facetMode});
        case "ADD_RANGE_FACET":
            let { key, min, max } = action;
            const filterLowerBound = min,
                  filterUpperBound = max;
            const rangeFacet: Store.RangeFacet = {
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
            newFacets[key] = rangeFacet;
            return objectAssign({}, state, { facets: newFacets});
        case "ADD_CHECKBOX_FACET":
             key = action.key;
             const { isNumeric } = action;
             const sort = "count",
                   count = 5;
             const checkFacet: Store.CheckboxFacet = {
                 key,
                 isNumeric,
                 values: [],
                 count,
                 sort,
                 filterClause: "",
                 facetClause: `${key},count:${count},sort:${sort}`
             };
             newFacets[key] = checkFacet;
             return objectAssign({}, state, { facets: newFacets});
        default:
            return state;
    }
}