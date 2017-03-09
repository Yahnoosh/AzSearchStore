import * as configActions from "../configActions";
import { Store } from "../../store";

const config: Store.Config = {
    index: "foo",
    queryKey: "bar",
    service: "buzz"
};

function searchCallback(state: Store.SearchState, postBody: { [key: string]: any }): Promise<any> {
    return null;
};

function suggestCallback(state: Store.SearchState, postBody: { [key: string]: any }): Promise<any> {
    return null;
};

describe("actions/config", () => {
    it("should create an action to set config", () => {
        expect(
            configActions.setConfig(config)
        ).toEqual({
            type: "SET_CONFIG",
            config
        });
    });
    it("should create an action to set searchCallback", () => {
        expect(
            configActions.setSearchCallback(searchCallback)
        ).toEqual({
            type: "SET_SEARCH_CALLBACK",
            searchCallback
        });
    });
    it("should create an action to set suggestCallback", () => {
        expect(
            configActions.setSuggestCallback(suggestCallback)
        ).toEqual({
            type: "SET_SUGGEST_CALLBACK",
            suggestCallback
        });
    });
});