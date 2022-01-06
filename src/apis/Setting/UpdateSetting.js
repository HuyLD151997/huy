import axiosService from "../../axios/axiosService";
import * as API_LINK from "../../constants/ApiLink";

const token = localStorage.getItem("token");

export const updateSettingApi = (id, data) => {
  return axiosService.put(`${API_LINK.UPDATE_SETTING}/${id}`, data, token);
};
