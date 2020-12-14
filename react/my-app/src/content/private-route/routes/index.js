import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import HomePage from "../pages/HomePage";
import UserPage from "../pages/UserPage";
import LoginPage from "../pages/LoginPage";
import _404Page from "../pages/_404Page";
import PrivateRoute from "./PrivateRoute";
import { useRouteMatch } from "../../k-react-router-dom";
import { Provider } from 'react-redux'
import store from '../store'

export default function Routes(props) {
  const match = useRouteMatch()
  return (
    <Provider store={store}>
      <Router>
        <Link to={`${match.url}/homepage`}>首页</Link>
        <Link to={`${match.url}/user`}>用户中心</Link>
        <Link to={`${match.url}/login`}>登录</Link>

        <Switch>
          <Route exact path={`${match.url}/homepage`} component={HomePage} />
          {/* <Route path={`${match.url}/user`} component={UserPage} /> */}
          <PrivateRoute path={`${match.url}/user`} component={UserPage} />
          <Route path={`${match.url}/login`} component={LoginPage} />
          <Route path={`${match.url}`} component={_404Page} />
        </Switch>
      </Router>
    </Provider>
  );
}