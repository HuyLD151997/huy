import * as getEmployeesByIdConstants from "../../constants/Employee/GetEmployeeById";

export const getEmployeeById = (id) => {
  return {
    type: getEmployeesByIdConstants.GET_EMPLOYEES_BY_ID,
    payload: id,
  };
};
export const getEmployeeByIdSuccess = (data) => {
  return {
    type: getEmployeesByIdConstants.GET_EMPLOYEES_BY_ID_SUCCESS,
    payload: {
      data,
    },
  };
};
export const getEmployeeByIdFailed = (error) => {
  return {
    type: getEmployeesByIdConstants.GET_EMPLOYEES_BY_ID_FAILED,
    payload: {
      error,
    },
  };
};
