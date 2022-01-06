import * as searchApprovedConstants from "../../constants/RequestCleaningTool/SearchApproved";

const initialState = {
  table: null,
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case searchApprovedConstants.SEARCH_APPROVED: {
      return {
        ...state,
        loading: true,
      };
    }
    case searchApprovedConstants.SEARCH_APPROVED_SUCCESS: {
      const { data } = action.payload;

      return {
        ...state,
        table: data,
        loading: false,
      };
    }
    case searchApprovedConstants.SEARCH_APPROVED_FAILED: {
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
