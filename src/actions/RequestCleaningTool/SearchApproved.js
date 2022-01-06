import * as searchApprovedConstants from "../../constants/RequestCleaningTool/SearchApproved";

export const searchApproved = (dataS, pageNo, pageSize) => {
  return {
    type: searchApprovedConstants.SEARCH_APPROVED,
    payload: {
      dataS,
      pageNo,
      pageSize,
    },
  };
};
export const searchApprovedSuccess = (data) => {
  return {
    type: searchApprovedConstants.SEARCH_APPROVED_SUCCESS,
    payload: {
      data,
    },
  };
};
export const searchApprovedFailed = (error) => {
  return {
    type: searchApprovedConstants.SEARCH_APPROVED_FAILED,
    payload: {
      error,
    },
  };
};
