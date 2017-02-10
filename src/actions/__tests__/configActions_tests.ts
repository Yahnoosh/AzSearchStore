import * as configActions from "../configActions";
import { Store } from "../../store";

const config: Store.Config = {
    index: "foo",
    queryKey: "bar",
    service: "buzz"
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
});