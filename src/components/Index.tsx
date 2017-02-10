import * as React from "react";
import { createStore } from "redux";
import { connect } from "react-redux";
import { reducers } from "../reducers/reducers";
import { Provider } from "react-redux";

let store = createStore(reducers);

export interface SearchProps { }

// 'HelloProps' describes the shape of props.
// State is never set so we use the 'undefined' type.
export class Search extends React.Component<SearchProps, undefined> {
    render() {
        return <div></div>;
    }
}