import * as getRequestCleaningToolApprovedConstants from "../../constants/RequestCleaningTool/GetRequestCleaningToolApproved";

const initialState = {
  table: null,
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case getRequestCleaningToolApprovedConstants.GET_REQUEST_CLEANING_TOOL_APPROVED: {
      return {
        ...state,
        loading: true,
      };
    }
    case getRequestCleaningToolApprovedConstants.GET_REQUEST_CLEANING_TOOL_APPROVED_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        table: data,
        loading: false,
      };
    }
    case getRequestCleaningToolApprovedConstants.GET_REQUEST_CLEANING_TOOL_APPROVED_FAILED: {
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
