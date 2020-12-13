import React, { Component } from "react";
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link,
//   Redirect,
//   useRouteMatch,
//   useParams,
//   withRouter
// } from "react-router-dom";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useRouteMatch,
  useParams,
  withRouter
} from "./content/k-react-router-dom";

import ContextPage from "./content/context/Pages/ContextPage";
import ReduxPage from "./content/redux/pages/ReduxPage";
import HocPage from "./content/hoc/pages/HocPage"
import FormPage from "./content/form/pages/FormPage"
import ReactReduxPage from "./content/react-redux/pages/ReactReduxPage"
import ReactReduxHookPage from "./content/react-redux/pages/ReactReduxHookPage"

export default function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/context">Context 使用</Link>
          </li>
          <li>
            <Link to="/redux">手写redux</Link>
          </li>
          <li>
            <Link to="/hoc">HOC</Link>
          </li>
          <li>
            <Link to="/form">Form</Link>
          </li>
          <li>
            <Link to="/react-redux">React-Redux</Link>
          </li>
          <li>
            <Link to="/topics">Topics</Link>
          </li>
        </ul>
        <hr></hr>
        <Switch>
          <Route exact path="/" children={(routerProps) => <Home {...routerProps}></Home>}>
            {/* <Home /> */}
          </Route>
          <Route path="/context">
            <ContextPage />
          </Route>
          <Route path="/redux">
            <Redux />
          </Route>
          <Route path="/topics">
            <Topics />
          </Route>
          <Route path="/hoc">
            <HOC />
          </Route>
          <Route path="/form">
            <FormPage />
          </Route>
          <Route path="/react-redux">
            <ReactReduxPage />
            <ReactReduxHookPage></ReactReduxHookPage>
          </Route>
          <Route component={_404Page}></Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home(pros) {
  return <Redirect to={{ pathname: '/welcome' }}></Redirect>
}

function Redux() {
  return <ReduxPage></ReduxPage>
}

function HOC() {
  return <HocPage></HocPage>
}

function Topics() {
  let match = useRouteMatch();

  return (
    <div>
      <h2>Topics</h2>

      <ul>
        <li>
          <Link to={`${match.url}/components`}>Components</Link>
        </li>
        <li>
          <Link to={`${match.url}/props-v-state`}>
            Props v. State
          </Link>
        </li>
      </ul>

      {/* The Topics page has its own <Switch> with more routes
          that build on the /topics URL path. You can think of the
          2nd <Route> here as an "index" page for all topics, or
          the page that is shown when no topic is selected */}
      <Switch>
        <Route path={`${match.path}/:topicId`}>
          <Topic />
        </Route>
        <Route path={match.path}>
          <h3>Please select a topic.</h3>
        </Route>
      </Switch>
    </div>
  );
}

function Topic() {
  let { topicId } = useParams();
  return <h3>Requested topic ID: {topicId}</h3>;
}

@withRouter
class _404Page extends Component {
  render() {
    console.log('withRouter:', this.props)
    return (
      <div>
        <h3>_404Page</h3>
      </div>
    );
  }
}
