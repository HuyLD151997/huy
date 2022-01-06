import * as getCustomersConstants from "../../constants/Customer/GetCustomer";

export const getCustomers = (pageNo, pageSize) => {
  return {
    type: getCustomersConstants.GET_CUSTOMER,
    payload: {
      pageNo,
      pageSize,
    },
  };
};
export const getCustomersSuccess = (data) => {
  return {
    type: getCustomersConstants.GET_CUSTOMER_SUCCESS,
    payload: {
      data,
    },
  };
};
export const getCustomersFailed = (error) => {
  return {
    type: getCustomersConstants.GET_CUSTOMER_FAILED,
    payload: {
      error,
    },
  };
};
