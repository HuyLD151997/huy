import * as getBookingInWorkingConstants from "../../constants/Booking/GetBookingInWorking";

export const getBookingInWorking = (pageNo, pageSize) => {
  return {
    type: getBookingInWorkingConstants.GET_BOOKING_IN_WORKING,
    payload: {
      pageNo,
      pageSize,
    },
  };
};
export const getBookingInWorkingSuccess = (data) => {
  return {
    type: getBookingInWorkingConstants.GET_BOOKING_IN_WORKING_SUCCESS,
    payload: {
      data,
    },
  };
};
export const getBookingInWorkingFailed = (error) => {
  return {
    type: getBookingInWorkingConstants.GET_BOOKING_IN_WORKING_FAILED,
    payload: {
      error,
    },
  };
};
