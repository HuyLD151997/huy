import * as getTransactionsConstants from "../../constants/Transaction/GetTransaction";

export const getTransactions = () => {
  return {
    type: getTransactionsConstants.GET_TRANSACTION,
  };
};
export const getTransactionsSuccess = (data) => {
  return {
    type: getTransactionsConstants.GET_TRANSACTION_SUCCESS,
    payload: {
      data,
    },
  };
};
export const getTransactionsFailed = (error) => {
  return {
    type: getTransactionsConstants.GET_TRANSACTION_FAILED,
    payload: {
      error,
    },
  };
};
