import * as searchCustomerConstants from "../../constants/Customer/SearchCustomer";

export const searchCustomer = (dataS, pageNo, pageSize) => {
  return {
    type: searchCustomerConstants.SEARCH_CUSTOMER,
    payload: {
      dataS,
      pageNo,
      pageSize,
    },
  };
};
export const searchCustomerSuccess = (data) => {
  return {
    type: searchCustomerConstants.SEARCH_CUSTOMER_SUCCESS,
    payload: {
      data,
    },
  };
};
export const searchCustomerFailed = (error) => {
  return {
    type: searchCustomerConstants.SEARCH_CUSTOMER_FAILED,
    payload: {
      error,
    },
  };
};
