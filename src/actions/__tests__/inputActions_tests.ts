import * as inputActions from "../inputActions";
import { Store } from "../../store";

describe("actions/input", () => {
    it("should create action to set input", () => {
        expect(
            inputActions.setInput("foo")
        ).toEqual({
            type: "SET_INPUT",
            input: "foo"
        });
    });
});