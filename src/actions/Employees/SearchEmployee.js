import * as searchEmployeeConstants from "../../constants/Employee/SearchEmployee";

export const searchEmployee = (dataS, pageNo, pageSize) => {
  return {
    type: searchEmployeeConstants.SEARCH_EMPLOYEE,
    payload: {
      dataS,
      pageNo,
      pageSize,
    },
  };
};
export const searchEmployeeSuccess = (data) => {
  return {
    type: searchEmployeeConstants.SEARCH_EMPLOYEE_SUCCESS,
    payload: {
      data,
    },
  };
};
export const searchEmployeeFailed = (error) => {
  return {
    type: searchEmployeeConstants.SEARCH_EMPLOYEE_FAILED,
    payload: {
      error,
    },
  };
};
