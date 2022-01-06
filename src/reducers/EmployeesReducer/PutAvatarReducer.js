import * as putAvatarConstants from "../../constants/Employee/PutAvatar";

const initialState = {
  table: "",
  refresh: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case putAvatarConstants.PUT_AVATAR: {
      return {
        ...state,
      };
    }
    case putAvatarConstants.PUT_AVATAR_SUCCESS: {
      const { data } = action.payload;
      console.log(data);
      return {
        ...state,
        table: data,
      };
    }
    case putAvatarConstants.PUT_AVATAR_FAILED: {
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
