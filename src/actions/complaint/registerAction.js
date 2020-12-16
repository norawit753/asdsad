import axios from "axios";
import { returnErrors } from "../main/errorAction";
import {
  COMPLAINT_REGISTER_SUCCESS,
  COMPLAINT_REGISTER_FAIL,
} from "../../type/complaint/type";

// registerUser
export const register = ({ buasri_id, email, position, active }) => (
  dispatch
) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  // Request body
  const body = JSON.stringify({ buasri_id, email, position, active });
  axios
    .post("http://localhost:5002/api/register", body, config)
    .then((res) => {
      dispatch({
        type: COMPLAINT_REGISTER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "COMPLAINT_REGISTER_FAIL"
        )
      );
    });
};
