import axiosService from "../../axios/axiosService";
import * as API_LINK from "./../../constants/ApiLink";
const token = localStorage.getItem("token");
export const searchCustomerApi = (search, pageIndex, pageSize) => {
  return axiosService.get(
    `${API_LINK.GET_CUSTOMER}?userName=${search}&pageIndex=${pageIndex}&pageSize=${pageSize}`,
    token
  );
};
