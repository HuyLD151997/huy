import axiosService from "../../axios/axiosService";
import * as API_LINK from "../../constants/ApiLink";

const token = localStorage.getItem("token");

export const providedRequestApi = (id) => {
  console.log(id);
  return axiosService.put(`${API_LINK.PROVIDED_REQUEST}/${id}`, "", token);
};
