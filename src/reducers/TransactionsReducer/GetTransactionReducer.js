import * as getTransactionsConstants from "../../constants/Transaction/GetTransaction";

const initialState = {
  table: [],
  refresh: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case getTransactionsConstants.GET_TRANSACTION: {
      return {
        ...state,
      };
    }
    case getTransactionsConstants.GET_TRANSACTION_SUCCESS: {
      const { data } = action.payload;

      return {
        ...state,
        table: data,
      };
    }
    case getTransactionsConstants.GET_TRANSACTION_FAILED: {
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
