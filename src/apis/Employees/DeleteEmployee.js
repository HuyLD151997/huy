import axiosService from "../../axios/axiosService";
import * as API_LINK from "../../constants/ApiLink";

const token = localStorage.getItem("token");

export const deleteEmployeeApi = (data) => {
  return axiosService.delete(`${API_LINK.DELETE_EMPLOYEE}/${data}`, token);
};
