import * as getSettingsConstants from "../../constants/Setting/GetSetting";

const initialState = {
  table: [],
  refresh: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case getSettingsConstants.GET_SETTING: {
      return {
        ...state,
      };
    }
    case getSettingsConstants.GET_SETTING_SUCCESS: {
      const { data } = action.payload;

      return {
        ...state,
        table: data,
      };
    }
    case getSettingsConstants.GET_SETTING_FAILED: {
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
