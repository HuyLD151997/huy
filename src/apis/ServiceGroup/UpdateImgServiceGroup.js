import axiosService from "../../axios/axiosService";
import * as API_LINK from "../../constants/ApiLink";

const token = localStorage.getItem("token");

export const updateImgServiceGroupApi = (id, data) => {
  console.log(id);
  console.log(data);
  return axiosService.put2(`${API_LINK.UPDATE_SERVICE_IMG}/${id}`, data, token);
};
