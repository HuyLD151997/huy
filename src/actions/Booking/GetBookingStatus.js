import * as getBookingStatusConstants from "../../constants/Booking/GetBookingStatus";

export const getBookingStatus = (id) => {
  return {
    type: getBookingStatusConstants.GET_BOOKING_STATUS,
    payload: id,
  };
};
export const getBookingStatusSuccess = (data) => {
  return {
    type: getBookingStatusConstants.GET_BOOKING_STATUS_SUCCESS,
    payload: {
      data,
    },
  };
};
export const getBookingStatusFailed = (error) => {
  return {
    type: getBookingStatusConstants.GET_BOOKING_STATUS_FAILED,
    payload: {
      error,
    },
  };
};
