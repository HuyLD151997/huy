import * as getBookingDetailConstants from "../../constants/Booking/GetBookingDetail";

const initialState = {
  table: null,
  refresh: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case getBookingDetailConstants.GET_BOOKING_DETAIL: {
      return {
        ...state,
      };
    }
    case getBookingDetailConstants.GET_BOOKING_DETAIL_SUCCESS: {
      const { data } = action.payload;

      return {
        ...state,
        table: data,
      };
    }
    case getBookingDetailConstants.GET_BOOKING_DETAIL_FAILED: {
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
