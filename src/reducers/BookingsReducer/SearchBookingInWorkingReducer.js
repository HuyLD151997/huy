import * as searchBookingInWorkingConstants from "../../constants/Booking/SearchBookingInWorking";

const initialState = {
  table: null,
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case searchBookingInWorkingConstants.SEARCH_BOOKING_IN_WORKING: {
      return {
        ...state,
        loading: true,
      };
    }
    case searchBookingInWorkingConstants.SEARCH_BOOKING_IN_WORKING_SUCCESS: {
      const { data } = action.payload;

      return {
        ...state,
        table: data,
        loading: false,
      };
    }
    case searchBookingInWorkingConstants.SEARCH_BOOKING_IN_WORKING_FAILED: {
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
