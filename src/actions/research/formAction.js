import axios from "axios";
import {
  RESEARCH_GET_UPLOAD_FILE,
  RESEARCH_ADD_LIST_SUCCESS,
  COLLECT_TAG,
} from "../../type/research/type";

// Env
import { config } from "../../utilis/config";
const conResearch = config.connectResearchAPI;
const conphp = config.connectPHP;

// Upload File
export const uploadfile = (NewUploadFile, token) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      "x-auth-token": token,
    },
  };
  axios
    .post(conResearch + "/api/upload", NewUploadFile, config)
    .then((res) => {
      dispatch({
        type: RESEARCH_GET_UPLOAD_FILE,
        payload: res.data,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

// PUT LIST TO MONGODB
export const newlist = ({
  token,
  year,
  title_name,
  firstname,
  lastname,
  buasri_id,
  email,
  article,
  type_name,
  level,
  sub_level_1,
  sub_level_2,
  conf_year,
  quartile,
  conference_name,
  conf_country,
  conf_local,
  author,
  name,
  tags,
  status,
  file_name,
  file_path,
}) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token,
    },
  };
  const configemail = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // body
  const body = JSON.stringify({
    year,
    title_name,
    firstname,
    lastname,
    buasri_id,
    email,
    article,
    type_name: type_name ? type_name : undefined,
    level,
    sub_level_1,
    sub_level_2,
    conf_year,
    quartile,
    conference_name: conference_name ? conference_name : undefined,
    conf_country: conf_country ? conf_country : undefined,
    conf_local: conf_local ? conf_local : undefined,
    author,
    name,
    tags: tags ? tags : undefined,
    status,
    file_name,
    file_path,
  });

  console.log(body);
  axios
    .put(conResearch + "/api/list/add", body, config)
    .then((res) => {
      if (res.data) {
        dispatch({
          type: RESEARCH_ADD_LIST_SUCCESS,
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

// Collect Tags
export const collecttag = (tag) => ({
  type: COLLECT_TAG,
  payload: {
    tag,
  },
});
