import {
  COMPLAINT_CLEAN_TRIGGER,
  COMPLAINT_ADD_LIST,
} from "../../type/complaint/type";

const initialState = {
  addlist: false,
};

export default function triggerReducer(state = initialState, action) {
  switch (action.type) {
    case COMPLAINT_ADD_LIST:
      return {
        ...state,
        addlist: true,
      };
    case COMPLAINT_CLEAN_TRIGGER:
      return {
        ...state,
        addlist: false,
      };
    default:
      return state;
  }
}
