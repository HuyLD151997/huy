import axiosService from "./../../axios/axiosService";
import * as API_LINK from "./../../constants/ApiLink";
const token = localStorage.getItem("token");
export const createServiceApi = (data) => {
  console.log(data);
  return axiosService.post(API_LINK.CREATE_SERVICE, data, token);
};
