import axiosService from "../../axios/axiosService";
import * as API_LINK from "./../../constants/ApiLink";
const token = localStorage.getItem("token");
export const getNewBookingsApi = (pageIndex, pageSize) => {
  return axiosService.get(
    `${API_LINK.GET_BOOKING_NEW}?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    token
  );
};
