import * as searchServiceConstants from "../../constants/ServiceGroup/SearchService";

export const searchService = (id, dataS, pageNo, pageSize) => {
  return {
    type: searchServiceConstants.SEARCH_SERVICE,
    payload: {
      id,
      dataS,
      pageNo,
      pageSize,
    },
  };
};
export const searchServiceSuccess = (data) => {
  return {
    type: searchServiceConstants.SEARCH_SERVICE_SUCCESS,
    payload: {
      data,
    },
  };
};
export const searchServiceFailed = (error) => {
  return {
    type: searchServiceConstants.SEARCH_SERVICE_FAILED,
    payload: {
      error,
    },
  };
};
