import * as config from "../config";
import * as configActions from "../../actions/configActions";
import { Store } from "../../store";

const reducer = config.config;

function searchCallback(state: Store.SearchState, postBody: { [key: string]: any }): Promise<any> {
    return null;
};

function suggestCallback(state: Store.SearchState, postBody: { [key: string]: any }): Promise<any> {
    return null;
};

describe("reducers/config", () => {
    it("should return initial state when given empty input", () => {
        expect(
            reducer(<Store.Config>undefined, <configActions.ConfigAction>{})
        ).toEqual(config.initialState);
    });
    it("should set config values", () => {
        expect(
            reducer(<Store.Config>{}, configActions.setConfig({ index: "foo", queryKey: "bar", service: "buzz" }))
        ).toEqual({
            index: "foo",
            queryKey: "bar",
            service: "buzz"
        });
    });
    it("should set searchCallback", () => {
        expect(
            reducer(config.initialState, configActions.setSearchCallback(searchCallback))
        ).toEqual({
            index: "",
            queryKey: "",
            service: "",
            searchCallback
        });
    });
    it("should set suggestCallback", () => {
        expect(
            reducer(config.initialState, configActions.setSuggestCallback(suggestCallback))
        ).toEqual({
            index: "",
            queryKey: "",
            service: "",
            suggestCallback
        });
    });
});