import axiosService from "../../axios/axiosService";
import * as API_LINK from "../../constants/ApiLink";

const token = localStorage.getItem("token");

export const updateCleaningToolApi = (id, data) => {
  console.log(id);
  console.log(data);
  return axiosService.put(
    `${API_LINK.UPDATE_CLEANING_TOOL}/${id}`,
    data,
    token
  );
};
