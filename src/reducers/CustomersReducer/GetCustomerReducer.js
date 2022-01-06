import * as getCustomersConstants from "../../constants/Customer/GetCustomer";

const initialState = {
  table: null,
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case getCustomersConstants.GET_CUSTOMER: {
      return {
        ...state,
        loading: true,
      };
    }
    case getCustomersConstants.GET_CUSTOMER_SUCCESS: {
      const { data } = action.payload;

      return {
        ...state,
        table: data,
        loading: false,
      };
    }
    case getCustomersConstants.GET_CUSTOMER_FAILED: {
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
