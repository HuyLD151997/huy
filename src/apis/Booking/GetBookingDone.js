import axiosService from "../../axios/axiosService";
import * as API_LINK from "./../../constants/ApiLink";
const token = localStorage.getItem("token");
export const getBookingDoneApi = (pageIndex, pageSize) => {
  return axiosService.get(
    `${API_LINK.GET_BOOKING_DONE}?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    token
  );
};
