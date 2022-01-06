import * as getServiceGroupsConstants from "../../constants/ServiceGroup/GetServiceGroups";

export const getServiceGroups = (pageNo, pageSize) => {
  return {
    type: getServiceGroupsConstants.GET_SERVICE_GROUPS,
    payload: {
      pageNo,
      pageSize,
    },
  };
};
export const getServiceGroupsSuccess = (data) => {
  return {
    type: getServiceGroupsConstants.GET_SERVICE_GROUPS_SUCCESS,
    payload: {
      data,
    },
  };
};
export const getServiceGroupsFailed = (error) => {
  return {
    type: getServiceGroupsConstants.GET_SERVICE_GROUPS_FAILED,
    payload: {
      error,
    },
  };
};
