import * as getBookingsConstants from "../../constants/Booking/GetBooking";

export const getBookings = (id, pageNo, pageSize) => {
  return {
    type: getBookingsConstants.GET_BOOKING,
    payload: {
      id,
      pageNo,
      pageSize,
    },
  };
};
export const getBookingsSuccess = (data) => {
  return {
    type: getBookingsConstants.GET_BOOKING_SUCCESS,
    payload: {
      data,
    },
  };
};
export const getBookingsFailed = (error) => {
  return {
    type: getBookingsConstants.GET_BOOKING_FAILED,
    payload: {
      error,
    },
  };
};
