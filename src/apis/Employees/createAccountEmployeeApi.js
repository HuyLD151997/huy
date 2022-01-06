import axiosService from "./../../axios/axiosService";
import * as API_LINK from "./../../constants/ApiLink";
const token = localStorage.getItem("token");
export const createAccountApi = (data) => {
  return axiosService.post2(API_LINK.CREATE_ACCOUNT_EMPLOYEE, data, token);
};
