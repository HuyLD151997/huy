import React from "react";
import { StateProvider } from "../../common/StateProvider/StateProvider";
import GetServicePage from "./GetServiceById";

const GetServicePageContainer = () => {
  const initialState = {
    loading1: false,
    page: 1,
    perPage: 5,
  };
  const reducer = (state, action) => {
    switch (action.type) {
      case "LOADING":
        return {
          ...state,
          loading1: action.newLoading,
        };
      case "CHANGE_PAGE":
        return {
          ...state,
          page: action.newPage,
        };
      case "CHANGE_PERPAGE":
        return {
          ...state,
          perPage: action.newPerPage,
        };

      default:
        break;
    }
  };
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <GetServicePage />
    </StateProvider>
  );
};
export default GetServicePageContainer;
