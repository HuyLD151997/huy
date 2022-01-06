import * as getEmployeeByIdConstants from "../../constants/Employee/GetEmployeeById";

const initialState = {
  table: [],
  refresh: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case getEmployeeByIdConstants.GET_EMPLOYEES_BY_ID: {
      return {
        ...state,
      };
    }
    case getEmployeeByIdConstants.GET_EMPLOYEES_BY_ID_SUCCESS: {
      const { data } = action.payload;

      return {
        ...state,
        table: data,
      };
    }
    case getEmployeeByIdConstants.GET_EMPLOYEES_BY_ID_FAILED: {
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
