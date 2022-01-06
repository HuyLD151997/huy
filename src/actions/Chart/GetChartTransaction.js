import * as getChartTransactionConstants from "../../constants/Chart/GetChartTransaction";

export const getChartTransaction = () => {
  return {
    type: getChartTransactionConstants.GET_CHART_TRANSACTION,
  };
};
export const getChartTransactionSuccess = (data) => {
  return {
    type: getChartTransactionConstants.GET_CHART_TRANSACTION_SUCCESS,
    payload: {
      data,
    },
  };
};
export const getChartTransactionFailed = (error) => {
  return {
    type: getChartTransactionConstants.GET_CHART_TRANSACTION_FAILED,
    payload: {
      error,
    },
  };
};
