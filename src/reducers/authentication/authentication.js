import swal from "sweetalert2";
import * as authenticateContants from "../../constants/Authenticate/Authenticate";

const initialState = {};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case authenticateContants.LOGIN: {
      return {
        ...state,
      };
    }
    case authenticateContants.LOGIN_SUCCESS: {
      swal.fire({
        icon: "success",
        text: "Đăng nhập thành công",
        timer: 2000,
        showConfirmButton: false,
      });
      return {
        ...state,
      };
    }
    case authenticateContants.LOGIN_FAILED: {
      const { error } = action.payload;
      swal.fire({
        icon: "error",
        text: "Tên đăng nhặp hoặc mật khẩu không đúng",
        timer: 3000,
        showConfirmButton: false,
      });
      return {
        ...state,
      };
    }
    case authenticateContants.LOGOUT: {
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
