import * as getWardsAndDistricsConstants2 from "../../constants/Employee/GetWardAndDistric2";

export const getWardsAndDistrics2 = (id) => {
  return {
    type: getWardsAndDistricsConstants2.GET_WARDS_AND_DISTRICS2,
    payload: id,
  };
};
export const getWardsAndDistricsSuccess2 = (data) => {
  return {
    type: getWardsAndDistricsConstants2.GET_WARDS_AND_DISTRICS_SUCCESS2,
    payload: {
      data,
    },
  };
};
export const getWardsAndDistricsFailed2 = (error) => {
  return {
    type: getWardsAndDistricsConstants2.GET_WARDS_AND_DISTRICS_FAILED2,
    payload: {
      error,
    },
  };
};
