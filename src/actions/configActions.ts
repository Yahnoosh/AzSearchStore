import { Store } from "../store";

export type ConfigAction = {
    type: "SET_CONFIG",
    config: Store.Config
};

export const setConfig = (config: Store.Config): ConfigAction => ({
    type: "SET_CONFIG",
    config
});