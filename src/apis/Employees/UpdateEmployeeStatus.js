import axiosService from "../../axios/axiosService";
import * as API_LINK from "../../constants/ApiLink";

const token = localStorage.getItem("token");

export const updateEmployeeStatusApi = (data) => {
  return axiosService.put(`${API_LINK.GET_EMPLOYEE_UPDATE}/${data}`, "", token);
};
