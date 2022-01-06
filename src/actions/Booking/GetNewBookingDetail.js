import * as getNewBookingDetailConstants from "../../constants/Booking/GetNewBookingDetail";

export const getNewBookingDetail = (id) => {
  return {
    type: getNewBookingDetailConstants.GET_NEW_BOOKING_DETAIL,
    payload: id,
  };
};
export const getNewBookingDetailSuccess = (data) => {
  return {
    type: getNewBookingDetailConstants.GET_NEW_BOOKING_DETAIL_SUCCESS,
    payload: {
      data,
    },
  };
};
export const getNewBookingDetailFailed = (error) => {
  return {
    type: getNewBookingDetailConstants.GET_NEW_BOOKING_DETAIL_FAILED,
    payload: {
      error,
    },
  };
};
