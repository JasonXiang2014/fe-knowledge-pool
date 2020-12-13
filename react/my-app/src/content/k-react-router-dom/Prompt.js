import RouterContext from "./Context";

import React, { Component } from "react";
export default function Prompt({ message, when = true }) {
  return (
    <RouterContext.Consumer>
      {(context) => {
        if (!when) return null;
        let method = context.history.block;

        return (
          <LifeCycle
            onMount={(self) => {
              self.unblock = method(message);
            }}
            onUnMount={(self) => {
              if (self.unblock) self.unblock();
            }}
          ></LifeCycle>
        );
      }}
    </RouterContext.Consumer>
  );
}

class LifeCycle extends Component {
  componentDidMount() {
    if (this.props.onMount) {
      this.props.onMount.call(this, this);
    }
  }

  componentWillUnmount() {
    if (this.props.onUnMount) {
      this.props.onUnMount.call(this, this);
    }
  }

  render() {
    return null;
  }
}
