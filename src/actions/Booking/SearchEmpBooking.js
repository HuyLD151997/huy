import * as searchEmpBookingConstants from "../../constants/Booking/SearchEmpBooking";

export const searchEmpBooking = (dataS) => {
  return {
    type: searchEmpBookingConstants.SEARCH_EMP_BOOKING,
    payload: {
      dataS,
    },
  };
};
export const searchEmpBookingSuccess = (data) => {
  return {
    type: searchEmpBookingConstants.SEARCH_EMP_BOOKING_SUCCESS,
    payload: {
      data,
    },
  };
};
export const searchEmpBookingFailed = (error) => {
  return {
    type: searchEmpBookingConstants.SEARCH_EMP_BOOKING_FAILED,
    payload: {
      error,
    },
  };
};
