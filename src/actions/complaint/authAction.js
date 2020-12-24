import axios from "axios";
import { returnErrors } from "../main/errorAction";
import {
  COMPLAINT_AUTH_SUCCESS,
  COMPLAINT_AUTH_FAIL,
} from "../../type/complaint/type";

// Auth User
export const auth_user = ({ buasri_id }) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Request body
  const body = JSON.stringify({ buasri_id });
  axios
    .post("http://10.1.5.143:5002/api/auth", body, config)

    .then((res) => {
      // console.log(res.data);
      if (res.data.token) {
        dispatch({
          type: COMPLAINT_AUTH_SUCCESS,
          payload: res.data,
        });
      }
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: COMPLAINT_AUTH_FAIL,
      });
    });
};

// Setup config/headers and token
export const tokenComplaint = (getState) => {
  // Get token from localstorage
  const token_complaint = getState().complaint.auth.token;
  // Headers
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  // If token, add to headers
  if (token_complaint) {
    config.headers["x-auth-token"] = token_complaint;
  }

  return config;
};
