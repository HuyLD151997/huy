import axiosService from "../../axios/axiosService";
import * as API_LINK from "./../../constants/ApiLink";
const token = localStorage.getItem("token");
export const searchServiceApi = (data, search, pageIndex, pageSize) => {
  console.log(search);
  console.log(data);
  console.log(pageIndex);
  console.log(pageSize);
  return axiosService.get(
    `${API_LINK.GET_SERVICE_BY_ID}/${data}?name=${search}&pageIndex=${pageIndex}&pageSize=${pageSize}`,
    token
  );
};
