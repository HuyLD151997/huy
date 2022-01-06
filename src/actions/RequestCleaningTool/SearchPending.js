import * as searchPendingConstants from "../../constants/RequestCleaningTool/SearchPending";

export const searchPending = (dataS, pageNo, pageSize) => {
  return {
    type: searchPendingConstants.SEARCH_PENDING,
    payload: {
      dataS,
      pageNo,
      pageSize,
    },
  };
};
export const searchPendingSuccess = (data) => {
  return {
    type: searchPendingConstants.SEARCH_PENDING_SUCCESS,
    payload: {
      data,
    },
  };
};
export const searchPendingFailed = (error) => {
  return {
    type: searchPendingConstants.SEARCH_PENDING_FAILED,
    payload: {
      error,
    },
  };
};
