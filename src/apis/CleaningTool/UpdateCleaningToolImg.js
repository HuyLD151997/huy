import axiosService from "../../axios/axiosService";
import * as API_LINK from "../../constants/ApiLink";

const token = localStorage.getItem("token");

export const updateCleaningToolImgApi = (id, data) => {
  console.log(data);
  return axiosService.put3(
    `${API_LINK.UPDATE_CLEANING_TOOL_IMG}/${id}`,
    data,
    token
  );
};
