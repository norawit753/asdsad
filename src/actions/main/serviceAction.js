import axios from "axios";
import { returnErrors } from "./errorAction";
import {
  GET_ALL_SERVICE_USER,
  GET_USER_SERVICE,
  GET_CURRENT_USER_SERVICE,
  ERROR_GET_SERVICE,
} from "../../type/main/type";

// Env
import { config } from "../../utilis/config";
const connect = config.connectMainAPI;

export const getServiceForUserPage = ({ token, buasri_id }) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token,
    },
  };

  const body = JSON.stringify({ buasri_id });
  //   console.log(body);
  axios
    .post(connect + "/api/users/service/list", body, config)
    .then((res) => {
      dispatch({
        type: GET_CURRENT_USER_SERVICE,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getAllServiceUserForAdmin = ({ token }) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token,
    },
  };

  axios
    .get(connect + "/api/users", config)
    .then((res) =>
      dispatch({
        type: GET_ALL_SERVICE_USER,
        payload: res.data,
      })
    )
    .catch((err) => {
      try {
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({
          type: ERROR_GET_SERVICE,
        });
        // console.log("connect server");
      } catch {
        // console.log("can't connect server");
      }
    });
};

export const getServiceUser = ({ token, buasri_id }) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token,
    },
  };

  const body = JSON.stringify({ buasri_id });
  //   console.log(body);
  axios
    .post(connect + "/api/users/service/list", body, config)
    .then((res) => {
      dispatch({
        type: GET_USER_SERVICE,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
