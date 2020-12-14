import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

export default connect(
  ({ user }) => ({ isLogin: user.isLogin })
)(function PrivateRoute({ isLogin, component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => {
        const { location } = props
        const { pathname } = location
        let toPathname = pathname.substr(0, pathname.lastIndexOf('/')).concat('/login')
        return isLogin
          ? <Component {...props}></Component>
          :
          <Redirect
            to={{ pathname: toPathname, state: { from: props.location.pathname } }}
          />
      }
      }
    ></Route>
  )
})
