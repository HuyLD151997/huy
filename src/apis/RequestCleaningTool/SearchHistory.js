import axiosService from "../../axios/axiosService";
import * as API_LINK from "./../../constants/ApiLink";
const token = localStorage.getItem("token");
export const searchHistoryApi = (search, pageIndex, pageSize) => {
  return axiosService.get(
    `${API_LINK.REQUEST_CLEANING_TOOL_HISTORY}?cleaningToolName=${search}&pageIndex=${pageIndex}&pageSize=${pageSize}`,
    token
  );
};
