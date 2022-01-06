import * as searchCustomerConstants from "../../constants/Customer/SearchCustomer";

const initialState = {
  table: null,
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case searchCustomerConstants.SEARCH_CUSTOMER: {
      return {
        ...state,
        loading: true,
      };
    }
    case searchCustomerConstants.SEARCH_CUSTOMER_SUCCESS: {
      const { data } = action.payload;

      return {
        ...state,
        table: data,
        loading: false,
      };
    }
    case searchCustomerConstants.SEARCH_CUSTOMER_FAILED: {
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
