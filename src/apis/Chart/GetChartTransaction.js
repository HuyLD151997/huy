import axiosService from "../../axios/axiosService";
import * as API_LINK from "./../../constants/ApiLink";
const token = localStorage.getItem("token");
export const getChartTransactionApi = () => {
  return axiosService.get(API_LINK.CHART_TRANSACTION, token);
};
