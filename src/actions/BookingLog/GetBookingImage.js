import * as getBookingImagesConstants from "../../constants/BookingLog/GetBookingImage";

export const getBookingImages = (id) => {
  return {
    type: getBookingImagesConstants.GET_BOOKING_IMAGE,
    payload: id,
  };
};
export const getBookingImagesSuccess = (data) => {
  return {
    type: getBookingImagesConstants.GET_BOOKING_IMAGE_SUCCESS,
    payload: {
      data,
    },
  };
};
export const getBookingImagesFailed = (error) => {
  return {
    type: getBookingImagesConstants.GET_BOOKING_IMAGE_FAILED,
    payload: {
      error,
    },
  };
};
