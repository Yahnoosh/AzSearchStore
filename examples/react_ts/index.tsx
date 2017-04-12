import * as React from "react";
import * as ReactDOM from "react-dom";
import * as redux from "redux";
import { AzSearchStore, Store } from "../../dist/AzSearchStore";

// create store
const store = new AzSearchStore();
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
store.setConfig({ index: "realestate-us-sample", queryKey: "8EF3C0C4BD32C51BCCA4D74AABFA118E", service: "azs-playground" });
store.updateSearchParameters({ count: true });
store.setInput("*");
store.addCheckboxFacet("beds", "number");
store.addRangeFacet("sqft","number", 0, 20000);
store.addCheckboxFacet("baths","number");
// set suggester, project some additional fields into the returned suggestions
store.updateSuggestionsParameters({
    suggesterName: "sg",
    select: "number,street,city,region,countryCode"
});


interface SearchProps {
    store: AzSearchStore;
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
        this.props.store.setInput(event.target.value);
    }
    onKeyPress(event: any) {
        if (event.key === "Enter") {
            return this.props.store.search();
        }
        this.props.store.suggest();
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
                        return <li>{suggestion.number} {suggestion.street} {suggestion.city}, {suggestion.region} {suggestion.countryCode}</li>;
                    })}
                </ul>
                <h2>Results</h2>
                <ul>
                    {results.map((result: any) => {
                        return <li>{result.number} {result.street} {result.city}, {result.region} {result.countryCode}</li>;
                    })}
                </ul>
            </div>
        );
    }
}

ReactDOM.render(<SearchPage store={store} />, document.getElementById("example"));