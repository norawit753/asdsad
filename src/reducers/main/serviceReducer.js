import {
  GET_USER_SERVICE,
  LOGOUT_SUCCESS,
  ERROR_GET_SERVICE,
} from "../../type/main/type";

const initialState = {
  buasri_id: null,
  firstname: null,
  lastname: null,
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
            buasri_id: service[0].buasri_id,
            firstname: service[0].firstname,
            lastname: service[0].lastname,
            E_Research: service[0].e_research,
            E_QA: service[0].e_qa,
            E_SciHuris: service[0].e_scihuris,
          }
        : {
            buasri_id: null,
            firstname: null,
            lastname: null,
            E_Research: null,
            E_QA: null,
            E_SciHuris: null,
          };
    case ERROR_GET_SERVICE:
      return {
        buasri_id: null,
        firstname: null,
        lastname: null,
        E_Research: null,
        E_QA: null,
        E_SciHuris: null,
      };
    case LOGOUT_SUCCESS:
      return {
        firstname: null,
        lastname: null,
        E_Research: null,
        E_QA: null,
        E_SciHuris: null,
      };
    default:
      return state;
  }
}
