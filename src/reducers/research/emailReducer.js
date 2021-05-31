import {
  RESEARCH_GET_EMAIL_COMMITTEE,
  RESEARCH_GET_EMAIL_ADMIN,
} from "../../type/research/type";
import { LOGOUT_SUCCESS, PAGE_LOADING } from "../../type/main/type";

const initialState = {
  email_committee: null,
  email_admin: null,
};

export default function emailReducer(state = initialState, action) {
  switch (action.type) {
    case RESEARCH_GET_EMAIL_COMMITTEE:
      const data_committee = action.payload;
      return data_committee
        ? {
            ...state,
            email_committee: data_committee,
            email_admin: null,
          }
        : { ...state };
    case RESEARCH_GET_EMAIL_ADMIN:
      const data_admin = action.payload;
      return data_admin
        ? {
            ...state,
            email_committee: null,
            email_admin: data_admin,
          }
        : { ...state };
    case PAGE_LOADING:
      return {
        ...state,
        email_committee: null,
        email_admin: null,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        email_committee: null,
        email_admin: null,
      };
    default:
      return state;
  }
}
