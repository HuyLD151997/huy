import * as getNewBookingsConstants from "../../constants/Booking/GetNewBooking";

const initialState = {
  table: null,
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case getNewBookingsConstants.GET_NEW_BOOKING: {
      return {
        ...state,
        loading: true,
      };
    }
    case getNewBookingsConstants.GET_NEW_BOOKING_SUCCESS: {
      const { data } = action.payload;

      return {
        ...state,
        table: data,
        loading: false,
      };
    }
    case getNewBookingsConstants.GET_NEW_BOOKING_FAILED: {
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
