import * as getCleaningToolsConstants from "../../constants/CleaningTool/GetCleaningTool";

const initialState = {
  table: null,
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case getCleaningToolsConstants.GET_CLEANING_TOOL: {
      return {
        ...state,
        loading: true,
      };
    }
    case getCleaningToolsConstants.GET_CLEANING_TOOL_SUCCESS: {
      const { data } = action.payload;

      return {
        ...state,
        table: data,
        loading: false,
      };
    }
    case getCleaningToolsConstants.GET_CLEANING_TOOL_FAILED: {
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
