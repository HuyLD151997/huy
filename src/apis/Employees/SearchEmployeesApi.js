import axiosService from "../../axios/axiosService";
import * as API_LINK from "./../../constants/ApiLink";
const token = localStorage.getItem("token");
export const searchEmployeesApi = (search, pageIndex, pageSize) => {
  console.log(search);
  return axiosService.get(
    `${API_LINK.GET_EMPLOYEES}?userName=${search}&pageIndex=${pageIndex}&pageSize=${pageSize}`,
    token
  );
};
