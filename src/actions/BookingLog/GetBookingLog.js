import * as getBookingLogsConstants from "../../constants/BookingLog/GetBookingLog";

export const getBookingLogs = (id) => {
  return {
    type: getBookingLogsConstants.GET_BOOKING_LOG,
    payload: id,
  };
};
export const getBookingLogsSuccess = (data) => {
  return {
    type: getBookingLogsConstants.GET_BOOKING_LOG_SUCCESS,
    payload: {
      data,
    },
  };
};
export const getBookingLogsFailed = (error) => {
  return {
    type: getBookingLogsConstants.GET_BOOKING_LOG_FAILED,
    payload: {
      error,
    },
  };
};
