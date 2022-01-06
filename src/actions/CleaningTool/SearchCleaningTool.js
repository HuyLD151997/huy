import * as searchCleaningToolConstants from "../../constants/CleaningTool/SearchCleaningTool";

export const searchCleaningTool = (pageNo, pageSize, dataS) => {
  return {
    type: searchCleaningToolConstants.SEARCH_CLEANING_TOOL,
    payload: {
      pageNo,
      pageSize,
      dataS,
    },
  };
};
export const searchCleaningToolSuccess = (data) => {
  return {
    type: searchCleaningToolConstants.SEARCH_CLEANING_TOOL_SUCCESS,
    payload: {
      data,
    },
  };
};
export const searchCleaningToolFailed = (error) => {
  return {
    type: searchCleaningToolConstants.SEARCH_CLEANING_TOOL_FAILED,
    payload: {
      error,
    },
  };
};
