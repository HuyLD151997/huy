import * as putAvatarConstants from "../../constants/Employee/PutAvatar";

export const putAvatar = (file) => {
  return {
    type: putAvatarConstants.PUT_AVATAR,
    payload: file,
  };
};
export const putAvatarSuccess = (data) => {
  return {
    type: putAvatarConstants.PUT_AVATAR_SUCCESS,
    payload: {
      data,
    },
  };
};
export const putAvatarFailed = (error) => {
  return {
    type: putAvatarConstants.PUT_AVATAR_FAILED,
    payload: {
      error,
    },
  };
};
