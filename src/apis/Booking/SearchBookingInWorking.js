import axiosService from "../../axios/axiosService";
import * as API_LINK from "./../../constants/ApiLink";
const token = localStorage.getItem("token");
export const searchBookingInWorkingApi = (search, pageIndex, pageSize) => {
  return axiosService.get(
    `${API_LINK.GET_BOOKING_IN_WORKING}?empName=${search}&pageIndex=${pageIndex}&pageSize=${pageSize}`,
    token
  );
};
