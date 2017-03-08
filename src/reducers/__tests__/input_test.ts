import * as input from "../input";
import * as inputActions from "../../actions/inputActions";

const initialState = input.initialState;

describe("reducers/input", () => {

    it("should properly set input", () => {
        expect(
            input.input(initialState, inputActions.setInput("foo"))
        ).toEqual("foo");
    });

});