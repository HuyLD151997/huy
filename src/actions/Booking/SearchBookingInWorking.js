import * as searchBookingInWorkingConstants from "../../constants/Booking/SearchBookingInWorking";

export const searchBookingInWorking = (dataS, pageNo, pageSize) => {
  return {
    type: searchBookingInWorkingConstants.SEARCH_BOOKING_IN_WORKING,
    payload: {
      dataS,
      pageNo,
      pageSize,
    },
  };
};
export const searchBookingInWorkingSuccess = (data) => {
  return {
    type: searchBookingInWorkingConstants.SEARCH_BOOKING_IN_WORKING_SUCCESS,
    payload: {
      data,
    },
  };
};
export const searchBookingInWorkingFailed = (error) => {
  return {
    type: searchBookingInWorkingConstants.SEARCH_BOOKING_IN_WORKING_FAILED,
    payload: {
      error,
    },
  };
};
