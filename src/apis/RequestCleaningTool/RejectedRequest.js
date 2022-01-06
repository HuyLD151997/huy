import axiosService from "../../axios/axiosService";
import * as API_LINK from "../../constants/ApiLink";

const token = localStorage.getItem("token");

export const rejectedRequestApi = (id, reason) => {
  console.log(id);
  console.log(reason);
  return axiosService.put(
    `${API_LINK.REJECTED_REQUEST}/${id}?reason=${reason}`,
    "",
    token
  );
};
