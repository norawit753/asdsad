import { GET_ERRORS, CLEAR_ERRORS } from "../../type/main/type";
const initialState = {
  msg: {},
  status: null,
  id: null,
};

export default function ErrorReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      const getError = action.payload;
      console.log(getError);
      return getError
        ? {
            msg: getError.msg,
            status: getError.status,
            id: getError.id,
          }
        : {
            msg: {},
            status: null,
            id: null,
          };
    case CLEAR_ERRORS:
      return {
        msg: {},
        status: null,
        id: null,
      };
    default:
      return state;
  }
}
