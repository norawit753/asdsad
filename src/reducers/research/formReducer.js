import { COLLECT_TAG, CLEAR_TAG } from "../../type/research/type";
import { LOGOUT_SUCCESS } from "../../type/main/type";

const initialState = {
  tags: null,
};

export default function formReducer(state = initialState, action) {
  switch (action.type) {
    case COLLECT_TAG:
      const data_tag = action.payload;
      return data_tag
        ? {
            tags: data_tag,
          }
        : { ...state };
    case CLEAR_TAG:
      return {
        tags: null,
      };
    case LOGOUT_SUCCESS:
      return {
        tags: null,
      };

    default:
      return state;
  }
}
