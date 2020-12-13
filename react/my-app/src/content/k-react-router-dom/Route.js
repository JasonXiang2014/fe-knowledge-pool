import React, { Component } from "react";
import RouterContext from "./Context";
import matchPath from './matchPath'

export default class Route extends Component {
  render() {
    return <RouterContext.Consumer>
      {
        context => {
          const location = context.location
          const { children, component, render, path, computedMatch } = this.props
          const match = computedMatch
            ? computedMatch
            : path
              ? matchPath(location.pathname, this.props)
              : null

          console.log('match', match)
          const props = {
            ...context,
            match
          }

          //注意点：单纯的route当path 和location.pathname不匹配时，即match为null 也会渲染children
          return <RouterContext.Provider value={props}>
            {
              match
                ? children
                  ? typeof children === 'function'
                    ? children(props)
                    : children
                  : component
                    ? React.createElement(component, props)
                    : render
                      ? render(props)
                      : null
                : typeof children === 'function'
                  ? children(props)
                  : null
            }
          </RouterContext.Provider>
        }
      }
    </RouterContext.Consumer>
  }
}
