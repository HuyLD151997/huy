import * as getBookingsConstants from "../../constants/Booking/GetBooking";

const initialState = {
  table: null,
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case getBookingsConstants.GET_BOOKING: {
      return {
        ...state,
        loading: true,
      };
    }
    case getBookingsConstants.GET_BOOKING_SUCCESS: {
      const { data } = action.payload;

      return {
        ...state,
        table: data,
        loading: false,
      };
    }
    case getBookingsConstants.GET_BOOKING_FAILED: {
      return {
        ...state,
        loading: false,
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
