import * as React from "react";
import * as ReactDOM from "react-dom";
import * as redux from "redux";
import ReduxThunk from "redux-thunk";
import { reducers } from "./reducers/reducers";
import { Store } from "./store";
import * as asyncActions from "./actions/asyncActions";
import * as configActions from "./actions/configActions";
import * as searchParameterActions from "./actions/searchParametersActions";
import * as suggestionsParameterActions from "./actions/suggestionsParametersActions";
import * as inputActions from "./actions/inputActions";
import * as facetsActions from "./actions/facetsActions";
import * as suggestionsActions from "./actions/suggestionsActions";
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
    console.info(`search params: ${JSON.stringify(state.parameters)}`);
    console.info(`facets: ${JSON.stringify(state.facets)}`);
    console.info(`results: ${JSON.stringify(state.results.count)}`);

});

// configuration
store.dispatch(configActions.setConfig({ index: "wikiversity", queryKey: "4412747C72BF48B6C761ED7E00D9964D", service: "azsdoofgod" }));
store.dispatch(searchParameterActions.updateSearchParameters({ count: true }));
store.dispatch(inputActions.setInput("*"));
store.dispatch(facetsActions.addCheckboxFacet("campusType", false));
store.dispatch(facetsActions.addRangeFacet("studentsCount", 0, 100000));
store.dispatch(facetsActions.addRangeFacet("endowmentAmount", 0, 5000000000));
store.dispatch(suggestionsParameterActions.updateSuggestionsParameters({ suggesterName: "titleSuggester" }));


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
        this.props.store.dispatch(inputActions.setInput(event.target.value));
    }
    onKeyPress(event: any) {
        if (event.key === "Enter") {
            return this.props.store.dispatch(asyncActions.fetchSearchResults);
        }
        this.props.store.dispatch(asyncActions.suggest);
    }
    render() {
        const state = this.state;
        const results: any = this.state.results.results;
                const suggestions: any = this.state.suggestions.suggestions;

        if (!state) {
            return <div />;
        }
        return (
            <div>
                <input value={state.parameters.input} onChange={this.handleChange.bind(this)} onKeyPress={this.onKeyPress.bind(this)}></input>
                <h3>count: {state.results.count}</h3>
                <h2>Suggestions</h2>
                <ul>
                    {suggestions && suggestions.map((suggestion: any) => {
                        return <li>{suggestion["@search.text"]}</li>;
                    })}
                </ul>
                <h2>Results</h2>
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