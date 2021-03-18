import axios from "axios";
import {
  RESEARCH_GET_LIST_USER,
  RESEARCH_GET_LIST_ADMIN,
  RESEARCH_GET_LIST_COMMITTEE,
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
