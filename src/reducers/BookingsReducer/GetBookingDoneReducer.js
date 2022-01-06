import * as getBookingDoneConstants from "../../constants/Booking/GetBookingDone";

const initialState = {
  table: null,
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case getBookingDoneConstants.GET_BOOKING_DONE: {
      return {
        ...state,
        loading: true,
      };
    }
    case getBookingDoneConstants.GET_BOOKING_DONE_SUCCESS: {
      const { data } = action.payload;

      return {
        ...state,
        table: data,
        loading: false,
      };
    }
    case getBookingDoneConstants.GET_BOOKING_DONE_FAILED: {
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
