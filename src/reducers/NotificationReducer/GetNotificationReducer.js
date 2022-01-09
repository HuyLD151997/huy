import * as getNotificationConstants from "../../constants/Notification/GetNotification";

const initialState = {
  table: [],
  refresh: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case getNotificationConstants.GET_NOTIFICATION: {
      return {
        ...state,
      };
    }
    case getNotificationConstants.GET_NOTIFICATION_SUCCESS: {
      const { data } = action.payload;

      return {
        ...state,
        table: data,
      };
    }
    case getNotificationConstants.GET_NOTIFICATION_FAILED: {
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
