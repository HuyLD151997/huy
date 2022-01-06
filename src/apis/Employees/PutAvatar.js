import axiosService from "../../axios/axiosService";
import * as API_LINK from "../../constants/ApiLink";

const token = localStorage.getItem("token");

export const putAvatarApi = (data) => {
  return axiosService.put(API_LINK.PUT_AVATAR, data, token);
};
