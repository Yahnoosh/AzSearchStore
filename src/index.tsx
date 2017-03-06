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


// create store
const store = redux.createStore(
    reducers,
    {} as Store.SearchState,
    redux.applyMiddleware(ReduxThunk)
);

// subscribe and dump state transitions to console
store.subscribe(() => {
    const state = store.getState();
    console.info("--------------------state--------------------");
    console.info(`config: ${JSON.stringify(state.config)}`);
    console.info(`search params: ${JSON.stringify(state.searchParameters)}`);
    console.info(`facets: ${JSON.stringify(state.facets)}`);
    console.info(`results: ${JSON.stringify(state.results.count)}`);

});

// configuration
store.dispatch(configActions.setConfig({ index: "wikiversity", queryKey: "4412747C72BF48B6C761ED7E00D9964D", service: "azsdoofgod" }));
store.dispatch(searchParameterActions.updateParameters({ count: true }));
store.dispatch(searchParameterActions.setInput("*"));
store.dispatch(facetsActions.addCheckboxFacet("campusType", false));
store.dispatch(facetsActions.addRangeFacet("studentsCount", 0, 100000));
store.dispatch(facetsActions.addRangeFacet("endowmentAmount", 0, 5000000000));


interface SearchProps {
    store: redux.Store<Store.SearchState>;
}


class SearchPage extends React.Component<SearchProps, Store.SearchState> {
    componentDidMount() {
        this.props.store.subscribe(() => { this.setState(this.props.store.getState()); });
    }
    constructor(props: SearchProps) {
        super(props);
        // set initial state
        this.state = props.store.getState();
    }
    handleChange(event: any) {
        this.props.store.dispatch(searchParameterActions.setInput(event.target.value));
    }
    onKeyPress(event: any) {
        if (event.key === "Enter") {
            this.props.store.dispatch(asyncActions.fetchSearchResults);
        }
    }
    render() {
        const state = this.state;
        const results: any = this.state.results.results;
        if (!state) {
            return <div />;
        }
        return (
            <div>
                <input value={state.searchParameters.input} onChange={this.handleChange.bind(this)} onKeyPress={this.onKeyPress.bind(this)}></input>
                <h3>count: {state.results.count}</h3>
                <ul>
                    {results.map((result: any) => {
                        return <li>{result.title}</li>;
                    })}
                </ul>
            </div>
        );
    }
}

ReactDOM.render(<SearchPage store={store} />, document.getElementById("example"));