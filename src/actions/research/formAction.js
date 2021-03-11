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
  //   console.log(...NewUploadFile);
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
