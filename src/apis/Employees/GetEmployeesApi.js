import axiosService from "../../axios/axiosService";
import * as API_LINK from "./../../constants/ApiLink";
const token = localStorage.getItem("token");
export const getEmployeesApi = (pageIndex, pageSize) => {
  console.log(token);
  return axiosService.get(
    `${API_LINK.GET_EMPLOYEES}?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    token
  );
};
