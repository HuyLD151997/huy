import axiosService from "../../axios/axiosService";
import * as API_LINK from "./../../constants/ApiLink";
const token = localStorage.getItem("token");
export const getNewBookingDetailApi = (data) => {
  console.log(data);
  return axiosService.get(
    `${API_LINK.GET_BOOKING_DETAIL_NEW_BOOKING}/${data}`,
    token
  );
};
