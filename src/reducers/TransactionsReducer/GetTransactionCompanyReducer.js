import * as getTransactionCompanyConstants from "../../constants/Transaction/GetTransactionCompany";

const initialState = {
  table: null,
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case getTransactionCompanyConstants.GET_TRANSACTION_COMPANY: {
      return {
        ...state,
        loading: true,
      };
    }
    case getTransactionCompanyConstants.GET_TRANSACTION_COMPANY_SUCCESS: {
      const { data } = action.payload;

      return {
        ...state,
        table: data,
        loading: false,
      };
    }
    case getTransactionCompanyConstants.GET_TRANSACTION_COMPANY_FAILED: {
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
