import axiosService from "../../axios/axiosService";
import * as API_LINK from "../../constants/ApiLink";

const token = localStorage.getItem("token");

export const seenNotificationApi = (data) => {
  return axiosService.put(`${API_LINK.SEEN}?id=${data}`, "", token);
};
