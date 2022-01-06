import * as getTransactionUsersConstants from "../../constants/Transaction/GetTransactionUser";

export const getTransactionUsers = (pageNo, pageSize) => {
  return {
    type: getTransactionUsersConstants.GET_TRANSACTION_USER,
    payload: {
      pageNo,
      pageSize,
    },
  };
};
export const getTransactionUsersSuccess = (data) => {
  return {
    type: getTransactionUsersConstants.GET_TRANSACTION_USER_SUCCESS,
    payload: {
      data,
    },
  };
};
export const getTransactionUsersFailed = (error) => {
  return {
    type: getTransactionUsersConstants.GET_TRANSACTION_USER_FAILED,
    payload: {
      error,
    },
  };
};
