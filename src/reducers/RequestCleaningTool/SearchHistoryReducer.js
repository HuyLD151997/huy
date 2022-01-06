import * as searchHistoryConstants from "../../constants/RequestCleaningTool/SearchHistory";

const initialState = {
  table: null,
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case searchHistoryConstants.SEARCH_HISTORY: {
      return {
        ...state,
        loading: true,
      };
    }
    case searchHistoryConstants.SEARCH_HISTORY_SUCCESS: {
      const { data } = action.payload;

      return {
        ...state,
        table: data,
        loading: false,
      };
    }
    case searchHistoryConstants.SEARCH_HISTORY_FAILED: {
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
