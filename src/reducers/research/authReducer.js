import {
  RESEARCH_LOADING,
  RESEARCH_LOADED,
  RESEARCH_REGISTER_SUCCESS,
  RESEARCH_REGISTER_FAIL,
  RESEARCH_AUTH_SUCCESS,
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
    case RESEARCH_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
      };
    case RESEARCH_REGISTER_SUCCESS:
      const regisSuccess = action.payload;
      localStorage.setItem("token_research", regisSuccess.token);
      return regisSuccess
        ? {
            ...state,
            token: regisSuccess.token,
            isAuthenticated: true,
            isLoading: false,
            user: {
              id: regisSuccess.user.id,
              buasri_id: regisSuccess.user.buasri_id,
              email: regisSuccess.user.email,
              position: regisSuccess.user.position,
            },
          }
        : {
            ...state,
          };
    case RESEARCH_REGISTER_FAIL:
      localStorage.removeItem("token_research");
      return {
        token: null,
        isAuthenticated: false,
        isLoading: false,
        user: {
          id: null,
          buasri_id: null,
          email: null,
          position: null,
          active: null,
        },
      };
    case RESEARCH_AUTH_SUCCESS:
      const researchUser = action.payload;
      localStorage.setItem("token_research", researchUser.token);
      return researchUser
        ? {
            ...state,
            token: researchUser.token,
            isAuthenticated: true,
            isLoading: false,
            user: {
              id: researchUser.user.id,
              buasri_id: researchUser.user.buasri_id,
              email: researchUser.user.email,
              position: researchUser.user.position,
            },
          }
        : {
            ...state,
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