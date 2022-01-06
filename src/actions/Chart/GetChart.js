import * as getChartsConstants from "../../constants/Chart/GetChart";

export const getCharts = () => {
  return {
    type: getChartsConstants.GET_CHART,
  };
};
export const getChartsSuccess = (data) => {
  return {
    type: getChartsConstants.GET_CHART_SUCCESS,
    payload: {
      data,
    },
  };
};
export const getChartsFailed = (error) => {
  return {
    type: getChartsConstants.GET_CHART_FAILED,
    payload: {
      error,
    },
  };
};
