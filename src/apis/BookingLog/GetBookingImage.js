import axiosService from "../../axios/axiosService";
import * as API_LINK from "./../../constants/ApiLink";
const token = localStorage.getItem("token");
export const getBookingImagesApi = (data) => {
  return axiosService.get(`${API_LINK.GET_BOOKING_IMAGE}/${data}`, token);
};
