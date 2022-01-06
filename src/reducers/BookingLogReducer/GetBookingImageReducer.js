import * as getBookingImagesConstants from "../../constants/BookingLog/GetBookingImage";

const initialState = {
  table: null,
  refresh: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case getBookingImagesConstants.GET_BOOKING_IMAGE: {
      return {
        ...state,
      };
    }
    case getBookingImagesConstants.GET_BOOKING_IMAGE_SUCCESS: {
      const { data } = action.payload;

      return {
        ...state,
        table: data,
      };
    }
    case getBookingImagesConstants.GET_BOOKING_IMAGE_FAILED: {
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
