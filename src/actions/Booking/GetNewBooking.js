import * as getNewBookingsConstants from "../../constants/Booking/GetNewBooking";

export const getNewBookings = (id, pageNo, pageSize) => {
  return {
    type: getNewBookingsConstants.GET_NEW_BOOKING,
    payload: {
      id,
      pageNo,
      pageSize,
    },
  };
};
export const getNewBookingsSuccess = (data) => {
  return {
    type: getNewBookingsConstants.GET_NEW_BOOKING_SUCCESS,
    payload: {
      data,
    },
  };
};
export const getNewBookingsFailed = (error) => {
  return {
    type: getNewBookingsConstants.GET_NEW_BOOKING_FAILED,
    payload: {
      error,
    },
  };
};
