import axiosService from "./../../axios/axiosService";
import * as API_LINK from "./../../constants/ApiLink";
const token = localStorage.getItem("token");
export const createCleaningToolApi = (data) => {
  return axiosService.post4(API_LINK.CREATE_CLEANING_TOOL, data, token);
};
