import * as searchPendingConstants from "../../constants/RequestCleaningTool/SearchPending";

const initialState = {
  table: null,
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case searchPendingConstants.SEARCH_PENDING: {
      return {
        ...state,
        loading: true,
      };
    }
    case searchPendingConstants.SEARCH_PENDING_SUCCESS: {
      const { data } = action.payload;

      return {
        ...state,
        table: data,
        loading: false,
      };
    }
    case searchPendingConstants.SEARCH_PENDING_FAILED: {
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
