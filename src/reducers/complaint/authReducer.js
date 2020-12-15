import {
  COMPLAINT_LOADING,
  COMPLAINT_LOADED,
  COMPLAINT_AUTH_SUCCESS,
  COMPLAINT_AUTH_FAIL,
  COMPLAINT_REGISTER_SUCCESS,
  COMPLAINT_REGISTER_FAIL,
} from "../../type/complaint/type";

import { LOGOUT_SUCCESS } from "../../type/main/type";

const initialState = {
  token: localStorage.getItem("token_complaint"),
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

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case COMPLAINT_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case COMPLAINT_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
      };
    case COMPLAINT_REGISTER_SUCCESS:
      const regisSuccess = action.payload;
      localStorage.setItem("token_complaint", regisSuccess.token);
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
              active: regisSuccess.user.active,
            },
          }
        : {
            ...state,
          };
    case COMPLAINT_REGISTER_FAIL:
      localStorage.removeItem("token_complaint");
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
    case COMPLAINT_AUTH_SUCCESS:
      const complaintUser = action.payload;
      localStorage.setItem("token_complaint", complaintUser.token);
      return complaintUser
        ? {
            ...state,
            token: complaintUser.token,
            isAuthenticated: true,
            isLoading: false,
            user: {
              id: complaintUser.user.id,
              buasri_id: complaintUser.user.buasri_id,
              email: complaintUser.user.email,
              position: complaintUser.user.position,
              active: complaintUser.user.active,
            },
          }
        : {
            ...state,
          };
    case LOGOUT_SUCCESS:
      localStorage.removeItem("token_complaint");
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
    default:
      return state;
  }
}
