import axiosService from "../../axios/axiosService";
import * as API_LINK from "../../constants/ApiLink";

const token = localStorage.getItem("token");

export const updateServiceStatusApi = (data) => {
  return axiosService.delete(
    `${API_LINK.UPDATE_SERVICE_STATUS}/${data}`,
    token
  );
};
