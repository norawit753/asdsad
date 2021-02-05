import {
  RESEARCH_LOADING,
  RESEARCH_LOADED,
  RESEARCH_REGISTER_SUCCESS,
  RESEARCH_REGISTER_FAIL,
  RESEARCH_AUTH_SUCCESS,
  RESEARCH_AUTH_FAIL,
} from "../../type/research/type";

import { LOGOUT_SUCCESS } from "../../type/main/type";

const initialState = {
  token: localStorage.getItem("token_research"),
  isAuthenticated: false,
  isLoading: false,
  user: {
    id: null,
    buasri_id: null,
    email: null,
  },
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case RESEARCH_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case LOGOUT_SUCCESS:
      localStorage.removeItem("token_research");
      return {
        token: null,
        isAuthenticated: false,
        isLoading: false,
        user: {
          id: null,
          buasri_id: null,
          email: null,
        },
      };
    default:
      return state;
  }
}
