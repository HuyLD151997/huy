import axiosService from "../../axios/axiosService";
import * as API_LINK from "./../../constants/ApiLink";
const token = localStorage.getItem("token");
export const getEmployeeByIdApi = (data) => {
  console.log(token);
  return axiosService.get(`${API_LINK.GET_EMPLOYEE_BY_ID}?id=${data}`, token);
};
