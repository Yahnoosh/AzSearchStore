import * as React from "react";
import * as ReactDOM from "react-dom";
import * as redux from "redux";
import ReduxThunk from "redux-thunk";
import { reducers } from "./reducers/reducers";
import { Store } from "./store";
import * as asyncActions from "./actions/asyncActions";
import * as configActions from "./actions/configActions";
import * as searchParameterActions from "./actions/searchParametersActions";
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
    console.info(`results: ${JSON.stringify(state.searchParameters)}`);
    console.info(`results: ${JSON.stringify(state.results)}`);

});

store.dispatch(configActions.setConfig({ index: "wikiversity", queryKey: "4412747C72BF48B6C761ED7E00D9964D", service: "azsdoofgod" }));

store.dispatch(searchParameterActions.setInput("virginia"));

store.dispatch(asyncActions.fetchSearchResults).then(() => {
    store.dispatch(searchParameterActions.incrementsSkip());
    store.dispatch(asyncActions.fetchSearchResults).then(() => {
        store.dispatch(asyncActions.loadMoreSearchResults);
    });
});


