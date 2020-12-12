import React, { Component } from "react";
// import { connect } from "react-redux";
import { bindActionCreators, connect } from "../k-react-redux";

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    count: state.count,
  };
};
// const mapDispatchToProps = {
//   add: () => ({ type: "ADD" }),
// };
const mapDispatchToProps = (dispatch) => {
  let creators = {
    add: () => ({ type: "ADD" }),
  };
  return {
    dispatch,
    ...bindActionCreators(creators, dispatch),
  };
};

@connect(mapStateToProps, mapDispatchToProps)
class ReactReduxPage extends Component {
  state = {};
  render() {
    console.log(this.props);
    const { count, dispatch, add } = this.props;
    return (
      <div>
        <h3>React-Redux Page</h3>
        <h3>{count}</h3>
        <button onClick={() => dispatch({ type: "ADD" })}>ADD</button>
        <button onClick={add}>prpps add</button>
        <hr></hr>
      </div>
    );
  }
}

export default ReactReduxPage;
