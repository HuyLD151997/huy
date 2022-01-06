import * as getBookingInWorkingConstants from "../../constants/Booking/GetBookingInWorking";

const initialState = {
  table: null,
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case getBookingInWorkingConstants.GET_BOOKING_IN_WORKING: {
      return {
        ...state,
        loading: true,
      };
    }
    case getBookingInWorkingConstants.GET_BOOKING_IN_WORKING_SUCCESS: {
      const { data } = action.payload;

      return {
        ...state,
        table: data,
        loading: false,
      };
    }
    case getBookingInWorkingConstants.GET_BOOKING_IN_WORKING_FAILED: {
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
