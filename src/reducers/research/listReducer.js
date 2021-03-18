import {
  RESEARCH_GET_LIST_USER,
  RESEARCH_GET_LIST_ADMIN,
  RESEARCH_GET_LIST_COMMITTEE,
} from "../../type/research/type";

import { LOGOUT_SUCCESS } from "../../type/main/type";

const initialState = {
  list: null,
  detail: null,
};

export default function listReducer(state = initialState, action) {
  switch (action.type) {
    case RESEARCH_GET_LIST_USER:
      return {
        ...state,
        list: action.payload,
      };
    case LOGOUT_SUCCESS:
      return {
        list: null,
        detail: null,
      };
    default:
      return state;
  }
}
