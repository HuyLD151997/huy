import * as getBookingDoneConstants from "../../constants/Booking/GetBookingDone";

export const getBookingDone = (id, pageNo, pageSize) => {
  return {
    type: getBookingDoneConstants.GET_BOOKING_DONE,
    payload: {
      id,
      pageNo,
      pageSize,
    },
  };
};
export const getBookingDoneSuccess = (data) => {
  return {
    type: getBookingDoneConstants.GET_BOOKING_DONE_SUCCESS,
    payload: {
      data,
    },
  };
};
export const getBookingDoneFailed = (error) => {
  return {
    type: getBookingDoneConstants.GET_BOOKING_DONE_FAILED,
    payload: {
      error,
    },
  };
};
