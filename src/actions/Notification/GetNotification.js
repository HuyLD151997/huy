import * as getNotificationConstants from "../../constants/Notification/GetNotification";

export const getNotification = (pageNo, pageSize) => {
  return {
    type: getNotificationConstants.GET_NOTIFICATION,
    payload: {
      pageNo,
      pageSize,
    },
  };
};
export const getNotificationSuccess = (data) => {
  return {
    type: getNotificationConstants.GET_NOTIFICATION_SUCCESS,
    payload: {
      data,
    },
  };
};
export const getNotificationFailed = (error) => {
  return {
    type: getNotificationConstants.GET_NOTIFICATION_FAILED,
    payload: {
      error,
    },
  };
};
