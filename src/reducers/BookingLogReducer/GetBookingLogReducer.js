import * as getBookingLogsConstants from "../../constants/BookingLog/GetBookingLog";

const initialState = {
  table: [],
  refresh: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case getBookingLogsConstants.GET_BOOKING_LOG: {
      return {
        ...state,
      };
    }
    case getBookingLogsConstants.GET_BOOKING_LOG_SUCCESS: {
      const { data } = action.payload;

      return {
        ...state,
        table: data,
      };
    }
    case getBookingLogsConstants.GET_BOOKING_LOG_FAILED: {
      return {
        ...state,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};
export default reducer;
