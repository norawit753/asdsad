import axios from "axios";
import { returnErrors, returnErrorsLdap } from "./errorAction";
import {
  AUTH_ERROR,
  USER_LOADED,
  USER_LOADING,
  PAGE_LOADING,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
} from "../../type/main/type";

// Check token & load user
export const loadUser = () => (dispatch, getState) => {
  // User loading
  dispatch({ type: USER_LOADING });
  axios
    .get("http://10.1.5.143:5000/api/auth/user", tokenMain(getState))
    .then((res) =>
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      })
    )
    .catch((err) => {
      try {
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({
          type: AUTH_ERROR,
        });
        // console.log("connect server");
      } catch {
        // console.log("can't connect server");
      }
    });
};

// Setup config/headers and token
export const tokenMain = (getState) => {
  // Get token from localstorage
  const token_main = getState().main.auth.token;
  // Headers
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  // If token, add to headers
  if (token_main) {
    config.headers["x-auth-token"] = token_main;
  }

  return config;
};

// Login
export const login = ({ buasri_id, password }) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  // Request body
  const body = JSON.stringify({ buasri_id, password });
  axios
    .post("http://10.1.5.143:2279/ldap.php", body, config)
    .then((res) => {
      if (res.data.Result) {
        axios
          .post("http://10.1.5.143:5000/api/auth", body, config)
          .then((res) =>
            dispatch({
              type: LOGIN_SUCCESS,
              payload: res.data,
            })
          )
          .then(() =>
            dispatch({
              type: PAGE_LOADING,
            })
          )
          .catch((err) => {
            dispatch(returnErrorsLdap());
            dispatch({
              type: LOGIN_FAIL,
            });
          });
      } else {
        axios.catch((err) => {
          dispatch(returnErrorsLdap());
          dispatch({
            type: LOGIN_FAIL,
          });
        });
      }
    })
    .catch((err) => {
      dispatch(returnErrorsLdap());
      dispatch({
        type: LOGIN_FAIL,
      });
    });
};

// Logout User
export const logout = () => {
  return function (dispatch) {
    dispatch({
      type: LOGOUT_SUCCESS,
    });
    dispatch({
      type: PAGE_LOADING,
    });
  };
};
