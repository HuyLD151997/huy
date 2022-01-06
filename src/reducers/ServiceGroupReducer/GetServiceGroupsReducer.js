import * as getServiceGroupsConstants from "../../constants/ServiceGroup/GetServiceGroups";

const initialState = {
  table: null,
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case getServiceGroupsConstants.GET_SERVICE_GROUPS: {
      return {
        ...state,
        loading: true,
      };
    }
    case getServiceGroupsConstants.GET_SERVICE_GROUPS_SUCCESS: {
      const { data } = action.payload;

      return {
        ...state,
        table: data,
        loading: false,
      };
    }
    case getServiceGroupsConstants.GET_SERVICE_GROUPS_FAILED: {
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
