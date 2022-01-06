import * as getRequestCleaningToolHistoryConstants from "../../constants/RequestCleaningTool/GetRequestCleaningToolHistory";

const initialState = {
  table: null,
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case getRequestCleaningToolHistoryConstants.GET_REQUEST_CLEANING_TOOL_HISTORY: {
      return {
        ...state,
        loading: true,
      };
    }
    case getRequestCleaningToolHistoryConstants.GET_REQUEST_CLEANING_TOOL_HISTORY_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        table: data,
        loading: false,
      };
    }
    case getRequestCleaningToolHistoryConstants.GET_REQUEST_CLEANING_TOOL_HISTORY_FAILED: {
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
