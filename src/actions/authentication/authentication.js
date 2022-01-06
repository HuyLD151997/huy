import * as authenticateConstants from "../../constants/Authenticate/Authenticate";

export const login = (password, username) => {
  return {
    type: authenticateConstants.LOGIN,
    payload: {
      password,
      username,
    },
  };
};
export const loginSuccess = (data) => {
  return {
    type: authenticateConstants.LOGIN_SUCCESS,
    payload: {
      data,
    },
  };
};
export const loginFailed = (error) => {
  return {
    type: authenticateConstants.LOGIN_FAILED,
    payload: {
      error,
    },
  };
};
export const logout = () => {
  return {
    type: authenticateConstants.LOGOUT,
  };
};
