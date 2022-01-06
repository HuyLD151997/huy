import axiosService from "../../axios/axiosService";
import * as API_LINK from "../../constants/ApiLink";

const token = localStorage.getItem("token");

export const coordinatorEmpApi = (id, empId) => {
  console.log(id);
  console.log(empId);
  return axiosService.put(
    `${API_LINK.COORDINATOR_EMP}/${id}/${empId}`,
    "",
    token
  );
};
