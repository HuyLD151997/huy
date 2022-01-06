import axiosService from "../../axios/axiosService";
import * as API_LINK from "../../constants/ApiLink";

const token = localStorage.getItem("token");

export const updateCleaningToolStatusApi = (data) => {
  return axiosService.put(
    `${API_LINK.UPDATE_CLEANING_TOOL_STATUS}/${data}`,
    "",
    token
  );
};
