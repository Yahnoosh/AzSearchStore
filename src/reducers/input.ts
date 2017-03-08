import { InputAction } from "../actions/inputActions";

export const initialState: string = "*";

export function input(state: string = initialState, action: InputAction): string {
    switch (action.type) {
        case "SET_INPUT":
            return action.input;
        default:
            return state;
    }
}