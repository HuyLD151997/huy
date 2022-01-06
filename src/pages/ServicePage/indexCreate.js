import React from "react";
import { StateProvider } from "../../common/StateProvider/StateProvider";
import CreateServicePage from "./CreateServicePage";

const CreateServicePageContainer = () => {
  const initialState = {
    loading1: false,
    page: 1,
    perPage: 15,
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
      <CreateServicePage />
    </StateProvider>
  );
};
export default CreateServicePageContainer;
