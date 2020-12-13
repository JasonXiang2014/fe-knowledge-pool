import React, { Component } from "react";
import RouterContext from "./Context";

export default class Redirect extends Component {
  render() {
    return <RouterContext.Consumer>
      {
        context => {
          const { history } = context
          const { to, push = false } = this.props
          return <LifeCycle onMounted={() => {
            push ? history.push(to) : history.replace(to)
          }}></LifeCycle>
        }
      }
    </RouterContext.Consumer>
  }
}

class LifeCycle extends Component {
  componentDidMount() {
    this.props.onMounted && this.props.onMounted()
  }

  render() {
    return null
  }
}