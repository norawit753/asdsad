import axios from "axios";
import {
  RESEARCH_GET_LIST_USER,
  RESEARCH_GET_LIST_ADMIN,
  RESEARCH_GET_LIST_COMMITTEE,
  RESEARCH_GET_DETAIL,
  RESEARCH_UPDATE_STATUS,
  RESEARCH_ERROR,
} from "../../type/research/type";

// Env
import { config } from "../../utilis/config";
const conResearch = config.connectResearchAPI;
const conphp = config.connectPHP;

// get list user
export const getlist_user = ({ buasri_id, token }) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token,
    },
  };
  const body = JSON.stringify({ buasri_id });
  axios
    .post(conResearch + "/api/list/user", body, config)
    .then((res) => {
      dispatch({
        type: RESEARCH_GET_LIST_USER,
        payload: res.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: RESEARCH_ERROR,
        payload: error.data,
      });
    });
};

// get list committee
export const getlist_committee = ({ dep, token }) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token,
    },
  };
  const body = JSON.stringify({ dep });
  axios
    .post(conResearch + "/api/list/committee", body, config)
    .then((res) => {
      dispatch({
        type: RESEARCH_GET_LIST_COMMITTEE,
        payload: res.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: RESEARCH_ERROR,
        payload: error.data,
      });
    });
};

// get detail when selected
export const getdetail_list = ({ token, id, buasri_id }) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token,
    },
  };

  const body = JSON.stringify({ buasri_id, id });
  // console.log(body);
  axios.post(conResearch + "/api/list/select", body, config).then((res) => {
    console.log(res.data);
    dispatch({
      type: RESEARCH_GET_DETAIL,
      payload: res.data,
    });
  });
};

// update status committee
export const status_committee = ({
  token,
  id,
  buasri_id,
  committee,
  email,
  status,
  note,
}) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token,
    },
  };
  const body = JSON.stringify({ id, buasri_id, committee, status, note });
  const email_user = JSON.stringify({ email });

  axios
    .post(conResearch + "/api/list/status_committee", body, config)
    .then((res) => {
      dispatch({
        type: RESEARCH_UPDATE_STATUS,
      });
    })
    .catch((error) => {
      dispatch({
        type: RESEARCH_ERROR,
        payload: error.data,
      });
    });
};
