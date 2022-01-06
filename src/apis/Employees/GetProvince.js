import axiosService from "../../axios/axiosService";
import * as API_LINK from "./../../constants/ApiLink";
const token = localStorage.getItem("token");
export const getProvincesApi = () => {
  return axiosService.get(API_LINK.GET_PROVINCES, token);
};
