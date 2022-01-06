import axiosService from "../../axios/axiosService";
import * as API_LINK from "./../../constants/ApiLink";
const token = localStorage.getItem("token");
export const getBookingLogsApi = (data) => {
  return axiosService.get(`${API_LINK.GET_BOOKING_LOG}/${data}`, token);
};
