import {
  COMPLAINT_GET_LIST_USER,
  COMPLAINT_GET_LIST_ALL,
  COMPLAINT_ERROR,
} from "../../type/complaint/type";
import { LOGOUT_SUCCESS } from "../../type/main/type";

const initialState = {
  list: null,
};

export default function listuserReducer(state = initialState, action) {
  switch (action.type) {
    case COMPLAINT_GET_LIST_USER:
      return {
        list: action.payload,
      };
    case COMPLAINT_GET_LIST_ALL:
      return {
        list: action.payload,
      };
    case COMPLAINT_ERROR:
      return {
        list: null,
      };
    case LOGOUT_SUCCESS:
      return {
        list: null,
      };
    default:
      return state;
  }
}
