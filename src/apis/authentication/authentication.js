import axiosService from "./../../axios/axiosService";
import * as API_LINK from "./../../constants/ApiLink";

export const login = (data) => {
  console.log(API_LINK.CHECK_LOGIN);
  return axiosService.post(API_LINK.CHECK_LOGIN, data);
};
