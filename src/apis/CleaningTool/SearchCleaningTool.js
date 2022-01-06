import axiosService from "../../axios/axiosService";
import * as API_LINK from "./../../constants/ApiLink";
const token = localStorage.getItem("token");
export const searchCleaningToolApi = (pageIndex, pageSize, data) => {
  console.log(token);
  return axiosService.get(
    `${API_LINK.SEARCH_CLEANING_TOOL}/${data}?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    token
  );
};
