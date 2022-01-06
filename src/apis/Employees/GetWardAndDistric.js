import axiosService from "../../axios/axiosService";
import * as API_LINK from "./../../constants/ApiLink";
const token = localStorage.getItem("token");
export const getGetWardsAndDistricsApi = (data) => {
  return axiosService.get(`${API_LINK.GET_WARD_AND_DISTRIC}/${data}`, token);
};
