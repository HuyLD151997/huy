import * as getBookingDetailConstants from "../../constants/Booking/GetBookingDetail";

export const getBookingDetail = (id) => {
  return {
    type: getBookingDetailConstants.GET_BOOKING_DETAIL,
    payload: id,
  };
};
export const getBookingDetailSuccess = (data) => {
  return {
    type: getBookingDetailConstants.GET_BOOKING_DETAIL_SUCCESS,
    payload: {
      data,
    },
  };
};
export const getBookingDetailFailed = (error) => {
  return {
    type: getBookingDetailConstants.GET_BOOKING_DETAIL_FAILED,
    payload: {
      error,
    },
  };
};
