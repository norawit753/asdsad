import {
  RESEARCH_GET_DETAIL,
  RESEARCH_UPDATE_STATUS,
  RESEARCH_EDIT_UPDATE,
} from "../../type/research/type";
import { LOGOUT_SUCCESS, PAGE_LOADING } from "../../type/main/type";

const initialState = {
  detail_page: false,
  update_status: false,
  send_success: false,
};

export default function Trigger(state = initialState, action) {
  switch (action.type) {
    case RESEARCH_GET_DETAIL:
      return {
        ...state,
        detail_page: true,
      };
    case RESEARCH_UPDATE_STATUS:
      return {
        ...state,
        update_status: true,
      };
    case RESEARCH_EDIT_UPDATE:
      return {
        ...state,
        send_success: true,
      };
    case PAGE_LOADING:
      return {
        detail_page: false,
        update_status: false,
        send_success: false,
      };
    case LOGOUT_SUCCESS:
      return {
        detail_page: false,
        update_status: false,
        send_success: false,
      };

    default:
      return state;
  }
}
