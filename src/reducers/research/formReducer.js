import {
  COLLECT_TAG,
  CLEAR_TAG,
  RESEARCH_SEND_MAIL_COMMITTEE,
} from "../../type/research/type";
import { LOGOUT_SUCCESS, PAGE_LOADING } from "../../type/main/type";

const initialState = {
  tags: null,
  send_success: false,
};

export default function formReducer(state = initialState, action) {
  switch (action.type) {
    case COLLECT_TAG:
      const data_tag = action.payload;
      return data_tag
        ? {
            ...state,
            tags: data_tag,
          }
        : { ...state };
    case RESEARCH_SEND_MAIL_COMMITTEE:
      return {
        ...state,
        send_success: true,
      };
    case CLEAR_TAG:
      return {
        tags: null,
        send_success: false,
      };
    case PAGE_LOADING:
      return {
        tags: null,
        send_success: false,
      };
    case LOGOUT_SUCCESS:
      return {
        tags: null,
        send_success: false,
      };

    default:
      return state;
  }
}
