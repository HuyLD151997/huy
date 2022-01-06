import * as getEmployeesConstants from "../../constants/Employee/GetEmployees";

const initialState = {
  table: null,
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case getEmployeesConstants.GET_EMPLOYEES: {
      return {
        ...state,
        loading: true,
      };
    }
    case getEmployeesConstants.GET_EMPLOYEES_SUCCESS: {
      const { data } = action.payload;

      return {
        ...state,
        table: data,
        loading: false,
      };
    }
    case getEmployeesConstants.GET_EMPLOYEES_FAILED: {
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
