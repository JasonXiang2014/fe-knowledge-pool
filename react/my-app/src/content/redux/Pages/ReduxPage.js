import React, { Component } from "react";
import store from "../store";

export default class ReduxPage extends Component {
  state = {};

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate();
    });
  }

  componentWillUnmount() {
    this.unsubscribe && this.unsubscribe();
  }

  add = () => {
    store.dispatch({
      type: "ADD",
    });
  };

  minus = () => {
    store.dispatch({
      type: "MINUS",
    });
  };

  render() {
    return (
      <div>
        <h3>this is redux page</h3>
        <p>{store.getState()}</p>
        <button onClick={this.add}>add</button>
        <button onClick={this.minus}>minus</button>
      </div>
    );
  }
}
