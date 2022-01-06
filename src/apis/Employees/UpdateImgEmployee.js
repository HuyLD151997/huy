import axiosService from "../../axios/axiosService";
import * as API_LINK from "../../constants/ApiLink";

const token = localStorage.getItem("token");

export const updateImgEmployeeApi = (id, data) => {
  console.log(id);
  console.log(data);
  return axiosService.put6(
    `${API_LINK.UPDATE_EMPLOYEES_AVA}?id=${id}`,
    data,
    token
  );
};
