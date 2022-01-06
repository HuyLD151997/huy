import axiosService from "../../axios/axiosService";
import * as API_LINK from "./../../constants/ApiLink";
const token = localStorage.getItem("token");
export const searchServiceGroupApi = (pageIndex, pageSize, data) => {
  return axiosService.get(
    `${API_LINK.SEARCH_SERVICE_GROUPS}/${data}?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    token
  );
};
