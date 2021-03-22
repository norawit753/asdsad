import { RESEARCH_GET_DETAIL } from "../../type/research/type";
import { LOGOUT_SUCCESS, PAGE_LOADING } from "../../type/main/type";

const initialState = {
  detail_page: false,
};

export default function Trigger(state = initialState, action) {
  switch (action.type) {
    case RESEARCH_GET_DETAIL:
      return {
        ...state,
        detail_page: true,
      };
    case PAGE_LOADING:
      return {
        ...state,
        detail_page: false,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        detail_page: false,
      };
    default:
      return state;
  }
}
