import * as React from "react";
import * as ReactDOM from "react-dom";
import * as redux from "redux";
import ReduxThunk from "redux-thunk";
import { reducers } from "./reducers/reducers";
import { Store } from "./store";
import * as asyncActions from "./actions/asyncActions";
import * as configActions from "./actions/configActions";
import * as searchParameterActions from "./actions/searchParametersActions";
import * as facetsActions from "./actions/facetsActions";
import * as promise from "es6-promise";

const store = redux.createStore(
    reducers,
    {} as Store.SearchState,
    redux.applyMiddleware(ReduxThunk)
);
store.subscribe(() => {
    const state = store.getState();
    console.info("--------------------state--------------------");
    console.info(`config: ${JSON.stringify(state.config)}`);
    console.info(`search params: ${JSON.stringify(state.searchParameters)}`);
    console.info(`facets: ${JSON.stringify(state.facets)}`);
    console.info(`results: ${JSON.stringify(state.results.count)}`);

});

store.dispatch(configActions.setConfig({ index: "wikiversity", queryKey: "4412747C72BF48B6C761ED7E00D9964D", service: "azsdoofgod" }));
store.dispatch(searchParameterActions.updateParameters({count: true}));
store.dispatch(searchParameterActions.setInput("*"));
store.dispatch(facetsActions.addCheckboxFacet("campusType", false));
store.dispatch(facetsActions.addRangeFacet("studentsCount", 0, 100000));
store.dispatch(facetsActions.addRangeFacet("endowmentAmount", 0, 5000000000));

store.dispatch(asyncActions.fetchSearchResults).then(() => {
    store.dispatch(facetsActions.toggleCheckboxFacetSelection("campusType", "urban"))
    store.dispatch(asyncActions.fetchSearchResultsFromFacet);
});


