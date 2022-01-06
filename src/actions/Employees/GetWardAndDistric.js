import * as getWardsAndDistricsConstants from "../../constants/Employee/GetWardAndDistric";

export const getWardsAndDistrics = (id) => {
  return {
    type: getWardsAndDistricsConstants.GET_WARDS_AND_DISTRICS,
    payload: id,
  };
};
export const getWardsAndDistricsSuccess = (data) => {
  return {
    type: getWardsAndDistricsConstants.GET_WARDS_AND_DISTRICS_SUCCESS,
    payload: {
      data,
    },
  };
};
export const getWardsAndDistricsFailed = (error) => {
  return {
    type: getWardsAndDistricsConstants.GET_WARDS_AND_DISTRICS_FAILED,
    payload: {
      error,
    },
  };
};
