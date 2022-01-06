import * as getWardsAndDistricsConstants from "../../constants/Employee/GetWardAndDistric";

const initialState = {
  table: [],
  refresh: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case getWardsAndDistricsConstants.GET_WARDS_AND_DISTRICS: {
      return {
        ...state,
      };
    }
    case getWardsAndDistricsConstants.GET_WARDS_AND_DISTRICS_SUCCESS: {
      const { data } = action.payload;

      return {
        ...state,
        table: data,
      };
    }
    case getWardsAndDistricsConstants.GET_WARDS_AND_DISTRICS_FAILED: {
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
