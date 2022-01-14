import * as searchEmpBookingConstants from "../../constants/Booking/SearchEmpBooking";

const initialState = {
  table: null,
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case searchEmpBookingConstants.SEARCH_EMP_BOOKING: {
      return {
        ...state,
        loading: true,
      };
    }
    case searchEmpBookingConstants.SEARCH_EMP_BOOKING_SUCCESS: {
      const { data } = action.payload;

      return {
        ...state,
        table: data,
        loading: false,
      };
    }
    case searchEmpBookingConstants.SEARCH_EMP_BOOKING_FAILED: {
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
