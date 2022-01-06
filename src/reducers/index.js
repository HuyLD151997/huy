import { combineReducers } from "redux";
import services from "./services";
import authenticateReducer from "./authentication/authentication";
import getEmployeesReducer from "./EmployeesReducer/GetEmployeesReducer";
import searchEmployeeReducer from "./EmployeesReducer/SearchEmployeeReducer";
import getProvincesReducer from "./EmployeesReducer/GetProvinceReducers";
import getWardsAndDistricsReducer from "./EmployeesReducer/GetWardAndDistricReducer";
import getWardsAndDistricsReducer2 from "./EmployeesReducer/GetWardAndDistricReducer2";
import getEmployeeByIdReducer from "./EmployeesReducer/GetEmployeeById";
import getCustomerReducer from "./CustomersReducer/GetCustomerReducer";
import searchCustomerReducer from "./CustomersReducer/SearchPendingReducer";
import getServiceGroupsReducer from "./ServiceGroupReducer/GetServiceGroupsReducer";
import searchServiceGroupReducer from "./ServiceGroupReducer/SearchServiceGroupReducer";
import searchServiceReducer from "./ServiceGroupReducer/SearchServiceReducer";
import getServiceByIdReducer from "./ServiceGroupReducer/GetServiceByIdReducer";
import putAvatarReducer from "./EmployeesReducer/PutAvatarReducer";
import transactionsReducer from "./TransactionsReducer/GetTransactionReducer";
import transactionUsersReducer from "./TransactionsReducer/GetTransactionUserReducer";
import transactionCompanyReducer from "./TransactionsReducer/GetTransactionCompanyReducer";
import bookingsReducer from "./BookingsReducer/GetBookingReducer";
import newBookingsReducer from "./BookingsReducer/GetNewBookingReducer";
import getBookingInWorkingReducer from "./BookingsReducer/GetBookingInWorkingReducer";
import bookingDoneReducer from "./BookingsReducer/GetBookingDoneReducer";
import bookingDetailReducer from "./BookingsReducer/GetBookingDetailReducer";
import newBookingDetailReducer from "./BookingsReducer/GetNewBookingDetailReducer";
import bookingImageReducer from "./BookingLogReducer/GetBookingImageReducer";
import bookingLogReducer from "./BookingLogReducer/GetBookingLogReducer";
import cleaningToolsReducer from "./CleaningTool/GetCleaningToolReducer";
import searchCleaningToolsReducer from "./CleaningTool/SearchCleaningToolReducer";
import requestCleaningToolPendingReducer from "./RequestCleaningTool/GetRequestCleaningToolPendingReducer";
import requestCleaningToolApprovedReducer from "./RequestCleaningTool/GetRequestCleaningToolApprovedReducer";
import requestCleaningToolHistoryReducer from "./RequestCleaningTool/GetRequestCleaningToolHistoryReducer";
import searchPendingReducer from "./RequestCleaningTool/SearchPendingReducer";
import searchApprovedReducer from "./RequestCleaningTool/SearchApprovedReducer";
import searchHistoryReducer from "./RequestCleaningTool/SearchHistoryReducer";
import getSettingsReducer from "./SettingReducer/GetSettingReducer";
import getChartsReducer from "./ChartReducer/GetChartReducer";
import getChartTransactionReducer from "./ChartReducer/GetChartTransactionReducer";
import searchBookingInWorkingReducer from "./BookingsReducer/SearchBookingInWorkingReducer";

const rootReducers = combineReducers({
  services,
  auth: authenticateReducer,
  searchBookingInWorking: searchBookingInWorkingReducer,
  getEmployees: getEmployeesReducer,
  searchEmployee: searchEmployeeReducer,
  getProvince: getProvincesReducer,
  getWardsAndDistrics: getWardsAndDistricsReducer,
  getWardsAndDistrics2: getWardsAndDistricsReducer2,
  getEmployeeById: getEmployeeByIdReducer,
  getCustomers: getCustomerReducer,
  searchCustomer: searchCustomerReducer,
  getServiceGroups: getServiceGroupsReducer,
  searchServiceGroup: searchServiceGroupReducer,
  searchService: searchServiceReducer,
  getServiceById: getServiceByIdReducer,
  getTransaction: transactionsReducer,
  getTransactionUser: transactionUsersReducer,
  getTransactionCompany: transactionCompanyReducer,
  getBooking: bookingsReducer,
  getNewBooking: newBookingsReducer,
  getBookingInWorking: getBookingInWorkingReducer,
  getBookingDone: bookingDoneReducer,
  getBookingDetail: bookingDetailReducer,
  getNewBookingDetail: newBookingDetailReducer,
  getBookingImage: bookingImageReducer,
  getBookingLog: bookingLogReducer,
  getRequestCleaningToolPending: requestCleaningToolPendingReducer,
  getRequestCleaningToolApproved: requestCleaningToolApprovedReducer,
  getRequestCleaningToolHistory: requestCleaningToolHistoryReducer,
  searchPending: searchPendingReducer,
  searchApproved: searchApprovedReducer,
  searchHistory: searchHistoryReducer,
  avatarStringCode: putAvatarReducer,
  cleaningTool: cleaningToolsReducer,
  searchCleaningTool: searchCleaningToolsReducer,
  getSetting: getSettingsReducer,
  getChart: getChartsReducer,
  getChartTransaction: getChartTransactionReducer,
});

export default rootReducers;
