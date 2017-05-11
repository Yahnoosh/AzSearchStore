import * as redux from "redux";
import ReduxThunk from "redux-thunk";
import * as promise from "es6-promise";
import { reducers } from "./reducers/reducers";
import * as asyncActions from "./actions/asyncActions";
import * as configActions from "./actions/configActions";
import * as searchParameterActions from "./actions/searchParametersActions";
import * as suggestionsParameterActions from "./actions/suggestionsParametersActions";
import * as inputActions from "./actions/inputActions";
import * as facetsActions from "./actions/facetsActions";
import * as suggestionsActions from "./actions/suggestionsActions";
import * as resultsActions from "./actions/resultsActions";
import { Store } from "./store";

export { asyncActions, configActions, searchParameterActions, suggestionsParameterActions, inputActions, facetsActions, suggestionsActions, resultsActions, Store };

export class AzSearchStore {
    public store: redux.Store<Store.SearchState>;
    constructor() {
        this.store = redux.createStore(
            reducers,
            {} as Store.SearchState,
            redux.applyMiddleware(ReduxThunk)
        );
    }

    // subscribing and reading state

    public subscribe(listener: () => void) {
        this.store.subscribe(listener);
    }
    public getState(): Store.SearchState {
        return this.store.getState();
    }

    // basic config

    public setConfig(config: Store.Config) {
        this.store.dispatch(configActions.setConfig(config));
    }

    // manipulating parameters for search requests

    public setSearchApiVersion(apiVersion: Store.SearchApiVersion) {
        this.store.dispatch(searchParameterActions.setSearchApiVersion(apiVersion));
    }
    public setSearchParameters(searchParameters: Store.SearchParameters) {
        this.store.dispatch(searchParameterActions.setSearchParameters(searchParameters));
    }
    public updateSearchParameters(searchParametersUpdate: Store.SearchParametersUpdate) {
        this.store.dispatch(searchParameterActions.updateSearchParameters(searchParametersUpdate));
    }
    public incrementSkip() {
        this.store.dispatch(searchParameterActions.incrementSkip);
    }
    public decrementSkip() {
        this.store.dispatch(searchParameterActions.decrementSkip);
    }

    public setPage(page: number) {
        this.store.dispatch(searchParameterActions.setPage(page));
    }

    // manipulating suggestions parameters

    public setSuggestionsApiVersion(apiVersion: Store.SearchApiVersion) {
        this.store.dispatch(suggestionsParameterActions.setSuggestionsApiVersion(apiVersion));
    }
    public setSuggestionsParameters(suggestionsParameters: Store.SuggestionsParameters) {
        this.store.dispatch(suggestionsParameterActions.setSuggestionsParameters(suggestionsParameters));
    }
    public updateSuggestionsParameters(suggestionsParametersUpdate: Store.SuggestionsParametersUpdate) {
        this.store.dispatch(suggestionsParameterActions.updateSuggestionsParameters(suggestionsParametersUpdate));
    }

    // setting input

    public setInput(input: string) {
        this.store.dispatch(inputActions.setInput(input));
    }

    // faceting and filtering

    public addRangeFacet(fieldName: string, dataType: Store.RangeDataType, min: number | Date, max: number | Date) {
        this.store.dispatch(facetsActions.addRangeFacet(fieldName, dataType, min, max));
    }
    public addCheckboxFacet(fieldName: string, dataType: Store.CheckboxDataType) {
        this.store.dispatch(facetsActions.addCheckboxFacet(fieldName, dataType));
    }
    public toggleCheckboxFacet(fieldName: string, value: string | number) {
        this.store.dispatch(facetsActions.toggleCheckboxFacetSelection(fieldName, value));
    }
    public setFacetRange(fieldName: string, lowerBound: number, upperBound: number) {
        this.store.dispatch(facetsActions.setFacetRange(fieldName, lowerBound, upperBound));
    }
    public clearFacetsSelections() {
        this.store.dispatch(facetsActions.clearFacetsSelections());
    }
    public setGlobalFilter(key: string, filter: string) {
        this.store.dispatch(facetsActions.setGlobalFilter(key, filter));
    }

    // extensibility

    public setSearchCallback(searchCallback: (state: Store.SearchState, postBody: { [key: string]: any }) => Promise<any>) {
        this.store.dispatch(configActions.setSearchCallback(searchCallback));
    }
    public setSuggestCallback(suggestCallback: (state: Store.SearchState, postBody: { [key: string]: any }) => Promise<any>) {
        this.store.dispatch(configActions.setSuggestCallback(suggestCallback));
    }
    public setResultsProcessor(resultsProcessor: (results: {}[]) => {}[]) {
        this.store.dispatch(resultsActions.setResultsProcessor(resultsProcessor));
    }
    public setSuggestionsProcessor(suggestionsProcessor: (suggestions: {}[]) => {}[]) {
        this.store.dispatch(suggestionsActions.setSuggestionsProcessor(suggestionsProcessor));
    }

    // search

    public search() {
        return this.store.dispatch(asyncActions.fetchSearchResults);
    }
    public loadMore() {
        return this.store.dispatch(asyncActions.loadMoreSearchResults);
    }
    public searchFromFacetAction() {
        return this.store.dispatch(asyncActions.fetchSearchResultsFromFacet);
    }

    // suggest

    public suggest() {
        return this.store.dispatch(asyncActions.suggest);
    }

    public clearSuggestions() {
        return this.store.dispatch(suggestionsActions.clearSuggestions());
    }

}