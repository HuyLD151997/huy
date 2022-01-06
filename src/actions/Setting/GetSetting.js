import * as getSettingsConstants from "../../constants/Setting/GetSetting";

export const getSettings = () => {
  return {
    type: getSettingsConstants.GET_SETTING,
  };
};
export const getSettingsSuccess = (data) => {
  return {
    type: getSettingsConstants.GET_SETTING_SUCCESS,
    payload: {
      data,
    },
  };
};
export const getSettingsFailed = (error) => {
  return {
    type: getSettingsConstants.GET_SETTING_FAILED,
    payload: {
      error,
    },
  };
};
