import * as searchServiceGroupConstants from "../../constants/ServiceGroup/SearchServiceGroup";

const initialState = {
  table: null,
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case searchServiceGroupConstants.SEARCH_SERVICE_GROUP: {
      return {
        ...state,
        loading: true,
      };
    }
    case searchServiceGroupConstants.SEARCH_SERVICE_GROUP_SUCCESS: {
      const { data } = action.payload;

      return {
        ...state,
        table: data,
        loading: false,
      };
    }
    case searchServiceGroupConstants.SEARCH_SERVICE_GROUP_FAILED: {
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
