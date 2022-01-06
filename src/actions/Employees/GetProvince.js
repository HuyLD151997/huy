import * as getProvincesConstants from "../../constants/Employee/GetProvince";

export const getProvinces = () => {
  return {
    type: getProvincesConstants.GET_PROVINCES,
  };
};
export const getProvincesSuccess = (data) => {
  return {
    type: getProvincesConstants.GET_PROVINCES_SUCCESS,
    payload: {
      data,
    },
  };
};
export const getProvincesFailed = (error) => {
  return {
    type: getProvincesConstants.GET_PROVINCES_FAILED,
    payload: {
      error,
    },
  };
};
