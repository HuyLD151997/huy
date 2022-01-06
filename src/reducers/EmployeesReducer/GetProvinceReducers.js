import * as getProvincesConstants from "../../constants/Employee/GetProvince";

const initialState = {
  table: [],
  refresh: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case getProvincesConstants.GET_PROVINCES: {
      return {
        ...state,
      };
    }
    case getProvincesConstants.GET_PROVINCES_SUCCESS: {
      const { data } = action.payload;

      return {
        ...state,
        table: data,
      };
    }
    case getProvincesConstants.GET_PROVINCES_FAILED: {
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
