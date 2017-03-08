import { Store } from "../store";

export type InputAction =
    {
        type: "SET_INPUT"
        input: string
    };

export const setInput = (input: string): InputAction => ({
    type: "SET_INPUT",
    input
});
