import * as getTransactionUsersConstants from "../../constants/Transaction/GetTransactionUser";

const initialState = {
  table: null,
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case getTransactionUsersConstants.GET_TRANSACTION_USER: {
      return {
        ...state,
        loading: true,
      };
    }
    case getTransactionUsersConstants.GET_TRANSACTION_USER_SUCCESS: {
      const { data } = action.payload;

      return {
        ...state,
        table: data,
        loading: false,
      };
    }
    case getTransactionUsersConstants.GET_TRANSACTION_USER_FAILED: {
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
