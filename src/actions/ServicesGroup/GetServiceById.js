import * as getServiceByIdConstants from "../../constants/ServiceGroup/GetServiceById";

export const getServiceById = (id, pageNo, pageSize) => {
  return {
    type: getServiceByIdConstants.GET_SERVICE_BY_ID,
    payload: {
      id,
      pageNo,
      pageSize,
    },
  };
};
export const getServiceByIdSuccess = (data) => {
  return {
    type: getServiceByIdConstants.GET_SERVICE_BY_ID_SUCCESS,
    payload: {
      data,
    },
  };
};
export const getServiceByIdFailed = (error) => {
  return {
    type: getServiceByIdConstants.GET_SERVICE_BY_ID_FAILED,
    payload: {
      error,
    },
  };
};
