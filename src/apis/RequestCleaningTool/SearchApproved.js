import axiosService from "../../axios/axiosService";
import * as API_LINK from "./../../constants/ApiLink";
const token = localStorage.getItem("token");
export const searchApprovedApi = (search, pageIndex, pageSize) => {
  return axiosService.get(
    `${API_LINK.REQUEST_CLEANING_TOOL_APPROVED}?cleaningToolName=${search}&pageIndex=${pageIndex}&pageSize=${pageSize}`,
    token
  );
};
