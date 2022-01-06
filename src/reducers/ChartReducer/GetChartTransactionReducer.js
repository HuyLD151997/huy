import * as getChartTransactionConstants from "../../constants/Chart/GetChartTransaction";

const initialState = {
  table: null,
  refresh: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case getChartTransactionConstants.GET_CHART_TRANSACTION: {
      return {
        ...state,
      };
    }
    case getChartTransactionConstants.GET_CHART_TRANSACTION_SUCCESS: {
      const { data } = action.payload;

      return {
        ...state,
        table: data,
      };
    }
    case getChartTransactionConstants.GET_CHART_TRANSACTION_FAILED: {
      return {
        ...state,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};
export default reducer;
