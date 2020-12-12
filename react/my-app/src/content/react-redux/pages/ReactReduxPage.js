import React, { Component } from "react";
import { connect } from "react-redux";

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    count: state.count,
  };
};

@connect(mapStateToProps)
class ReactReduxPage extends Component {
  state = {};
  render() {
    const { count, dispatch } = this.props;
    return (
      <div>
        <h3>React-Redux Page</h3>
        <h3>{count}</h3>
        <button onClick={() => dispatch({ type: "ADD" })}>ADD</button>
      </div>
    );
  }
}

export default ReactReduxPage;
