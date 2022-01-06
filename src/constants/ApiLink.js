export const BASE_URL = "http://api.beclean.store/api";

export const MAP_KEY = "AIzaSyBjnyL2BSaV2tCT8PGFZZmKkZQXqCDBSPs";

export const CHECK_LOGIN = "http://api.beclean.store/api/Account/Auth";

export const GET_EMPLOYEES = `${BASE_URL}/Account/Employees`;

export const UPDATE_EMPLOYEES_AVA = `${BASE_URL}/Account/Avatar`;

export const GET_PROVINCES = "http://api.beclean.store/api/SubPackage/Province";

export const GET_WARD_AND_DISTRIC =
  "http://api.beclean.store/api/SubPackage/WardAndDistric";

export const CREATE_ACCOUNT_EMPLOYEE =
  "http://api.beclean.store/api/Account/Employee";

export const DELETE_EMPLOYEE = "http://api.beclean.store/api/Account/Disable";

export const GET_EMPLOYEE_BY_ID =
  "http://api.beclean.store/api/Account/UserDetails";

export const GET_EMPLOYEE_UPDATE =
  "http://api.beclean.store/api/Account/Enable";

export const GET_CUSTOMER = "http://api.beclean.store/api/Account/Customers";

export const GET_SERVICE_GROUPS = "http://api.beclean.store/api/ServiceGroup";

export const SEARCH_SERVICE_GROUPS =
  "http://api.beclean.store/api/ServiceGroup/SearchingByName";

export const DELETE_SERVICE_GROUPS =
  "http://api.beclean.store/api/ServiceGroup/Disable";

export const CREATE_SERVICE_GROUPS =
  "http://api.beclean.store/api/ServiceGroup";

export const UPDATE_SERVICE_GROUP = "http://api.beclean.store/api/ServiceGroup";

export const UPDATE_SERVICE_GROUP_STATUS =
  "http://api.beclean.store/api/ServiceGroup/Enable";

export const GET_SERVICE_BY_ID =
  "http://api.beclean.store/api/Service/ServiceGroupId";

export const DELETE_SERVICE = "http://api.beclean.store/api/Service/Disable";

export const UPDATE_SERVICE_STATUS =
  "http://api.beclean.store/api/Service/Enable";

export const CREATE_SERVICE = "http://api.beclean.store/api/Service";

export const UPDATE_SERVICE = "http://api.beclean.store/api/Service";

export const UPDATE_SERVICE_IMG =
  "http://api.beclean.store/api/ServiceGroup/Image";

export const GET_TRANSACTION_USER =
  "http://api.beclean.store/api/Transaction/User";

export const GET_TRANSACTION_BOOKING =
  "http://api.beclean.store/api/Transaction/Booking";

export const GET_TRANSACTION_COMPANY =
  "http://api.beclean.store/api/Transaction/Company";

export const GET_BOOKING = `${BASE_URL}/Booking/Default`;

export const GET_BOOKING_NEW = `${BASE_URL}/Booking/BookingNew`;

export const GET_BOOKING_DONE = `${BASE_URL}/Booking/BookingFinished`;

export const GET_BOOKING_IN_WORKING = `${BASE_URL}/Booking/BookingInWorking`;

export const GET_BOOKING_DETAIL_NEW_BOOKING = `${BASE_URL}/Booking/DetailWithRecomendEmployee`;

export const COORDINATOR_EMP = `${BASE_URL}/Booking/AssigningEmployee`;

export const GET_BOOKING_DETAIL = `${BASE_URL}/Booking/BookingDetailAdmin`;

export const GET_BOOKING_STATUS = `${BASE_URL}/BookingStatus`;

export const GET_BOOKING_IMAGE = `${BASE_URL}/BookingLog/BookingImages`;

export const GET_BOOKING_IMAGE_BEFORE = `${BASE_URL}/BookingLog/BookingImageReference`;

export const GET_BOOKING_LOG = `${BASE_URL}/BookingLog`;

export const PUT_AVATAR = `${BASE_URL}/Account/Avatar`;

export const GET_AVATAR = "http://api.beclean.store/api/Account/Avatar";

export const GET_CLEANING_TOOL =
  "http://api.beclean.store/api/CleaningTool/Default";

export const SEARCH_CLEANING_TOOL =
  "http://api.beclean.store/api/CleaningTool/SearchingByName";

export const CREATE_CLEANING_TOOL = "http://api.beclean.store/api/CleaningTool";

export const DELETE_CLEANING_TOOL = `${BASE_URL}/CleaningTool/Disable`;

export const UPDATE_CLEANING_TOOL_STATUS = `${BASE_URL}/CleaningTool/Enable`;

export const UPDATE_CLEANING_TOOL = `${BASE_URL}/CleaningTool`;

export const UPDATE_QUANTITY_CLEANING_TOOL = `${BASE_URL}/CleaningTool/Adding`;

export const UPDATE_CLEANING_TOOL_IMG = `${BASE_URL}/CleaningTool/Image`;

export const REQUEST_CLEANING_TOOL_PENDING = `${BASE_URL}/RequestCleaningTool/Pending`;

export const REQUEST_CLEANING_TOOL_APPROVED = `${BASE_URL}/RequestCleaningTool/Approved`;

export const REQUEST_CLEANING_TOOL_HISTORY = `${BASE_URL}/RequestCleaningTool/AdminHistory`;

export const APPROVED_REQUEST = `${BASE_URL}/RequestCleaningTool/Approved`;

export const REJECTED_REQUEST = `${BASE_URL}/RequestCleaningTool/Rejected`;

export const PROVIDED_REQUEST = `${BASE_URL}/RequestCleaningTool/Provided`;

export const GET_SETTING = `${BASE_URL}/Setting`;

export const UPDATE_SETTING = `${BASE_URL}/Setting`;

export const CHART = `${BASE_URL}/Chart/Booking`;

export const CHART_TRANSACTION = `${BASE_URL}/Chart/Transaction`;
