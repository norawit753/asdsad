import axios from "axios";
import {
  RESEARCH_GET_UPLOAD_FILE,
  RESEARCH_ADD_LIST,
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
  buasri_id,
  email,
  article,
  level,
  sub_level_1,
  sub_level_2,
  conf_year,
  author,
  name,
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
};
