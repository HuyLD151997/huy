import * as searchServiceGroupConstants from "../../constants/ServiceGroup/SearchServiceGroup";

export const searchServiceGroup = (pageNo, pageSize, dataS) => {
  return {
    type: searchServiceGroupConstants.SEARCH_SERVICE_GROUP,
    payload: {
      pageNo,
      pageSize,
      dataS,
    },
  };
};
export const searchServiceGroupSuccess = (data) => {
  return {
    type: searchServiceGroupConstants.SEARCH_SERVICE_GROUP_SUCCESS,
    payload: {
      data,
    },
  };
};
export const searchServiceGroupFailed = (error) => {
  return {
    type: searchServiceGroupConstants.SEARCH_SERVICE_GROUP_FAILED,
    payload: {
      error,
    },
  };
};
