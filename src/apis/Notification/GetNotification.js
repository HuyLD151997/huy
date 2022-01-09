import axiosService from "../../axios/axiosService";
import * as API_LINK from "./../../constants/ApiLink";
const token = localStorage.getItem("token");
export const getNotificationApi = () => {
  return axiosService.get(API_LINK.NOTIFICATION, token);
};
