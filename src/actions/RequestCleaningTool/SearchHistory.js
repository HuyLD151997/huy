import * as searchHistoryConstants from "../../constants/RequestCleaningTool/SearchHistory";

export const searchHistory = (dataS, pageNo, pageSize) => {
  return {
    type: searchHistoryConstants.SEARCH_HISTORY,
    payload: {
      dataS,
      pageNo,
      pageSize,
    },
  };
};
export const searchHistorySuccess = (data) => {
  return {
    type: searchHistoryConstants.SEARCH_HISTORY_SUCCESS,
    payload: {
      data,
    },
  };
};
export const searchHistoryFailed = (error) => {
  return {
    type: searchHistoryConstants.SEARCH_HISTORY_FAILED,
    payload: {
      error,
    },
  };
};
