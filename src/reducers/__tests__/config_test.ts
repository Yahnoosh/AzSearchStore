import * as config from "../config";
import * as configActions from "../../actions/configActions";
import { Store } from "../../store";

const reducer = config.config;

describe("reducers/config", () => {
    it("should return initial state when given empty input", () => {
        expect(
            reducer(<Store.Config>undefined, <configActions.ConfigAction>{})
        ).toEqual(config.initialState);
    });
    it("should set config values", () => {
        expect(
            reducer(<Store.Config>{}, configActions.setConfig({index: "foo", queryKey: "bar", service: "buzz"}))
        ).toEqual({
            index: "foo",
            queryKey: "bar",
            service: "buzz"
        });
    });
});