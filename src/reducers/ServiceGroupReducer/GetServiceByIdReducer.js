import * as getServiceByIdConstants from "../../constants/ServiceGroup/GetServiceById";

const initialState = {
  table: null,
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case getServiceByIdConstants.GET_SERVICE_BY_ID: {
      return {
        ...state,
        loading: true,
      };
    }
    case getServiceByIdConstants.GET_SERVICE_BY_ID_SUCCESS: {
      const { data } = action.payload;

      return {
        ...state,
        table: data,
        loading: false,
      };
    }
    case getServiceByIdConstants.GET_SERVICE_BY_ID_FAILED: {
      return {
        ...state,
        loading: false,
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
