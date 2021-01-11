import {
  GET_USER_SERVICE,
  LOGOUT_SUCCESS,
  ERROR_GET_SERVICE,
} from "../../type/main/type";

const initialState = {
  E_Research: null,
  E_QA: null,
  E_SciHuris: null,
};

export default function serviceReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_SERVICE:
      const service = action.payload;
      return service
        ? {
            E_Research: service.e_research.active,
            E_QA: service.e_qa.active,
            E_SciHuris: service.e_scihuris.active,
          }
        : {
            E_Research: null,
            E_QA: null,
            E_SciHuris: null,
          };
    case ERROR_GET_SERVICE:
      return {
        E_Research: null,
        E_QA: null,
        E_SciHuris: null,
      };
    case LOGOUT_SUCCESS:
      return {
        E_Research: null,
        E_QA: null,
        E_SciHuris: null,
      };
    default:
      return state;
  }
}
