import * as getNewBookingDetailConstants from "../../constants/Booking/GetNewBookingDetail";

const initialState = {
  table: null,
  refresh: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case getNewBookingDetailConstants.GET_NEW_BOOKING_DETAIL: {
      return {
        ...state,
      };
    }
    case getNewBookingDetailConstants.GET_NEW_BOOKING_DETAIL_SUCCESS: {
      const { data } = action.payload;

      return {
        ...state,
        table: data,
      };
    }
    case getNewBookingDetailConstants.GET_NEW_BOOKING_DETAIL_FAILED: {
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
