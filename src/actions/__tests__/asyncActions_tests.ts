import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as nock from "nock";
import * as actions from "../asyncActions";
import { Store } from "../../store";
import * as searchParameters from "../../reducers/searchParameters";

const facetResults: { [key: string]: Store.FacetResult[] } = {
            "foo": [
                { value: "c", count: 10},
                { value: "d", count: 17}
            ],
            "bar": [
                {to: 0, count: 0},
                {from: 0, to: 10, count: 100},
                {from: 10, count: 0}
            ]
        };

const searchResponse = {
    "@odata.context": "",
    "@odata.nextLink": "",
    "@search.facets": facetResults,
    value: [
        { foo: "bar" },
        { foo: "bar" },
        { foo: "bar" }
    ]
};

const config: Store.Config = { index: "foo", service: "bar", queryKey: "buzz" };

const facets: Store.Facets = { facetMode: "simple", facets: {} };


const middleWare = [thunk];
const mockStore = configureMockStore(middleWare);

// mocking date.now so that it returns consistent time
const ts = Date.now();
Date.now = jest.fn(() => ts);

describe("actions/async", () => {
    afterEach(() => {
        nock.cleanAll();
    });
    it("should create opening and closing actions when fetching search results as well as set facet action", () => {
        nock(`https://${config.service}.search.windows.net`)
            .get(`/indexes/${config.index}/docs`)
            .query(true)
            .reply(200, searchResponse);

        const expectedActions = [
            { type: "INITIATE_SEARCH" },
            { type: "RECEIVE_RESULTS", results: searchResponse.value, receivedAt: Date.now() },
            { type: "SET_FACETS_VALUES", facets: facetResults}
        ];

        const store = mockStore({ config, searchParameters: searchParameters.initialState, facets });

        store.dispatch(actions.fetchSearchResults).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
    it("should create opening and closing actions when appending search results", () => {
        nock(`https://${config.service}.search.windows.net`)
            .get(`/indexes/${config.index}/docs`)
            .query(true)
            .times(2)
            .reply(200, searchResponse);

        const expectedActions = [
            { type: "INITIATE_SEARCH" },
            { type: "APPEND_RESULTS", results: searchResponse.value, receivedAt: Date.now() }
        ];

        const store = mockStore({ config, searchParameters: searchParameters.initialState, facets });

        store.dispatch(actions.loadMoreSearchResults).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
    it("should create opening and closing actions as well as update action when search is initiated form facet", () => {
        nock(`https://${config.service}.search.windows.net`)
            .get(`/indexes/${config.index}/docs`)
            .query(true)
            .times(2)
            .reply(200, searchResponse);

        const expectedActions = [
            { type: "INITIATE_SEARCH" },
            { type: "RECEIVE_RESULTS", results: searchResponse.value, receivedAt: Date.now() },
            { type: "UPDATE_FACETS_VALUES", facets: facetResults}
        ];

        const store = mockStore({ config, searchParameters: searchParameters.initialState, facets });

        store.dispatch(actions.fetchSearchResultsFromFacet).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});

