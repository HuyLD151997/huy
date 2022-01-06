import * as getWardsAndDistricsConstants2 from "../../constants/Employee/GetWardAndDistric2";

const initialState = {
  table: [],
  refresh: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case getWardsAndDistricsConstants2.GET_WARDS_AND_DISTRICS2: {
      return {
        ...state,
      };
    }
    case getWardsAndDistricsConstants2.GET_WARDS_AND_DISTRICS_SUCCESS2: {
      const { data } = action.payload;

      return {
        ...state,
        table: data,
      };
    }
    case getWardsAndDistricsConstants2.GET_WARDS_AND_DISTRICS_FAILED2: {
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
