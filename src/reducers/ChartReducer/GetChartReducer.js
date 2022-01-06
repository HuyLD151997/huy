import * as getChartsConstants from "../../constants/Chart/GetChart";

const initialState = {
  table: null,
  refresh: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case getChartsConstants.GET_CHART: {
      return {
        ...state,
      };
    }
    case getChartsConstants.GET_CHART_SUCCESS: {
      const { data } = action.payload;

      return {
        ...state,
        table: data,
      };
    }
    case getChartsConstants.GET_CHART_FAILED: {
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
