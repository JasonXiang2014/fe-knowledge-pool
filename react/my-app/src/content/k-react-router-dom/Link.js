import React, { Component } from "react";
import RouterContext from "./Context";

export default class Link extends Component {
  static contextType = RouterContext;

  handleClick = (event) => {
    event.preventDefault();
    const { history } = this.context;
    history.push(this.props.to);
  };
  render() {
    const { to, children, ...rest } = this.props;
    return (
      <a href={to} {...rest} onClick={this.handleClick}>
        {children}
      </a>
    );
  }
}
