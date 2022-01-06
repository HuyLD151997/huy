import axiosService from "../../axios/axiosService";
import * as API_LINK from "./../../constants/ApiLink";
const token = localStorage.getItem("token");
export const getRequestCleaningToolPendingApi = (pageIndex, pageSize) => {
  return axiosService.get(
    `${API_LINK.REQUEST_CLEANING_TOOL_PENDING}?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    token
  );
};
