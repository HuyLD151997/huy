import * as getRequestCleaningToolApprovedConstants from "../../constants/RequestCleaningTool/GetRequestCleaningToolApproved";

export const getRequestCleaningToolApproved = (pageNo, pageSize) => {
  return {
    type: getRequestCleaningToolApprovedConstants.GET_REQUEST_CLEANING_TOOL_APPROVED,
    payload: {
      pageNo,
      pageSize,
    },
  };
};
export const getRequestCleaningToolApprovedSuccess = (data) => {
  return {
    type: getRequestCleaningToolApprovedConstants.GET_REQUEST_CLEANING_TOOL_APPROVED_SUCCESS,
    payload: {
      data,
    },
  };
};
export const getRequestCleaningToolApprovedFailed = (error) => {
  return {
    type: getRequestCleaningToolApprovedConstants.GET_REQUEST_CLEANING_TOOL_APPROVED_FAILED,
    payload: {
      error,
    },
  };
};
