import axiosService from "../../axios/axiosService";
import * as API_LINK from "./../../constants/ApiLink";
const token = localStorage.getItem("token");
export const getServiceByIdApi = (data, pageIndex, pageSize) => {
  return axiosService.get(
    `${API_LINK.GET_SERVICE_BY_ID}/${data}?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    token
  );
};
