import axiosService from "../../axios/axiosService";
import * as API_LINK from "./../../constants/ApiLink";
const token = localStorage.getItem("token");
export const getTransactionCompanyApi = (pageIndex, pageSize) => {
  return axiosService.get(
    `${API_LINK.GET_TRANSACTION_COMPANY}?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    token
  );
};
