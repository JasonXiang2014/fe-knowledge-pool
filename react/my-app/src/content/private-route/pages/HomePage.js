import React, { Component } from "react";
import { connect } from "react-redux";
import { logout } from "../actions/user"
class HomePage extends Component {
  render() {
    const { isLogin, user, logout, err } = this.props
    console.log(this.props)
    return (
      <div>
        <h3>HomePage</h3>
        {
          isLogin ? <button onClick={() => logout(user.userInfo)}>Logout</button>
            : null
        }
        {
          err ? <h3>{err.msg}</h3> : null
        }
      </div>
    );
  }
}
export default connect(({ user }) => ({
  isLogin: user.isLogin,
  user,
  err: user.err
}), {
  logout
})(HomePage)