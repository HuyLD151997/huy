import * as getRequestCleaningToolPendingConstants from "../../constants/RequestCleaningTool/GetRequestCleaningToolPending";

const initialState = {
  table: null,
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case getRequestCleaningToolPendingConstants.GET_REQUEST_CLEANING_TOOL_PENDING: {
      return {
        ...state,
        loading: true,
      };
    }
    case getRequestCleaningToolPendingConstants.GET_REQUEST_CLEANING_TOOL_PENDING_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        table: data,
        loading: false,
      };
    }
    case getRequestCleaningToolPendingConstants.GET_REQUEST_CLEANING_TOOL_PENDING_FAILED: {
      return {
        ...state,
      };
    }
    default: {
      return {
        ...state,
        loading: false,
      };
    }
  }
};
export default reducer;
