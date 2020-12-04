import { PAGE_LOADED, PAGE_LOADING } from "../../type/main/type";

const initialState = {
  load: false,
};

export default function LoadPage(state = initialState, action) {
  switch (action.type) {
    case PAGE_LOADING:
      return {
        load: true,
      };
    case PAGE_LOADED:
      return {
        load: false,
      };
    default:
      return state;
  }
}
