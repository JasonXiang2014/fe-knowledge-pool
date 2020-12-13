import React, { Component } from "react";
import Router from "./Router";
import { createBrowserHistory } from "history";

export default class BrowserRouter extends Component {
  render() {
    const history = createBrowserHistory();
    return <Router history={history} children={this.props.children}></Router>;
  }
}
