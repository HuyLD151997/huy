import * as getTransactionCompanyConstants from "../../constants/Transaction/GetTransactionCompany";

export const getTransactionCompany = (pageNo, pageSize) => {
  return {
    type: getTransactionCompanyConstants.GET_TRANSACTION_COMPANY,
    payload: {
      pageNo,
      pageSize,
    },
  };
};
export const getTransactionCompanySuccess = (data) => {
  return {
    type: getTransactionCompanyConstants.GET_TRANSACTION_COMPANY_SUCCESS,
    payload: {
      data,
    },
  };
};
export const getTransactionCompanyFailed = (error) => {
  return {
    type: getTransactionCompanyConstants.GET_TRANSACTION_COMPANY_FAILED,
    payload: {
      error,
    },
  };
};
