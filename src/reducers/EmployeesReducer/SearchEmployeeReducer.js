import * as searchEmployeeConstants from "../../constants/Employee/SearchEmployee";

const initialState = {
  table: null,
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case searchEmployeeConstants.SEARCH_EMPLOYEE: {
      return {
        ...state,
        loading: true,
      };
    }
    case searchEmployeeConstants.SEARCH_EMPLOYEE_SUCCESS: {
      const { data } = action.payload;

      return {
        ...state,
        table: data,
        loading: false,
      };
    }
    case searchEmployeeConstants.SEARCH_EMPLOYEE_FAILED: {
      return {
        ...state,
        loading: false,
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
