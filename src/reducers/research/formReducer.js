import { COLLECT_TAG } from "../../type/research/type";

const initialState = {
  tags: null,
};

export default function formReducer(state = initialState, action) {
  switch (action.type) {
    case COLLECT_TAG:
      const tags = action.payload;
      return tags
        ? {
            tags: tags,
          }
        : { ...state };

    default:
      return state;
  }
}
