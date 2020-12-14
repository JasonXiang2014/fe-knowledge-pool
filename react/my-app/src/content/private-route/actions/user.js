import LoginService from "../service/login";
import LogoutService from "../service/logout"

//用thunk处理异步
export const login = userInfo => (dispatch, getState) => {
  LoginService.login(userInfo).then(
    res => {
      // dispatch({
      //   type: "LOGIN_SUCCESS",
      //   payload: {
      //     ...res
      //   }
      // });
      getMoreUserInfo(dispatch, res);
    },
    err => {
      dispatch({
        type: "LOGIN_FAILURE",
        payload: err
      });
    }
  );
};

const getMoreUserInfo = (dispatch, userInfo) => {
  return LoginService.getMoreUserInfo(userInfo).then(res => {
    dispatch({
      type: "LOGIN_SUCCESS",
      payload: {
        ...res
      }
    });
  });
};


export const logout = (userInfo) => dispatch => {
  LogoutService.logout(userInfo).then(res => {
    dispatch({
      type: "LOGOUT_SUCCESS",
      payload: {
        ...res
      }
    });
  }, err => {
    dispatch({
      type: "LOGOUT_FAILURE",
      payload: {
        ...err
      }
    });
  })
}