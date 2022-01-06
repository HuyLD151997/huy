import * as searchServiceConstants from "../../constants/ServiceGroup/SearchService";

const initialState = {
  table: null,
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case searchServiceConstants.SEARCH_SERVICE: {
      return {
        ...state,
        loading: true,
      };
    }
    case searchServiceConstants.SEARCH_SERVICE_SUCCESS: {
      const { data } = action.payload;

      return {
        ...state,
        table: data,
        loading: false,
      };
    }
    case searchServiceConstants.SEARCH_SERVICE_FAILED: {
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
