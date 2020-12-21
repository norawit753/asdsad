import axios from "axios";
import {
  COMPLAINT_GET_UPLOAD_FILE,
  COMPLAINT_ADD_LIST,
  COMPLAINT_ERROR,
} from "../../type/complaint/type";

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
    .post("http://localhost:5002/api/list/upload", NewUploadFile, config)
    .then((res) => {
      dispatch({
        type: COMPLAINT_GET_UPLOAD_FILE,
        payload: res.data,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

// PUT FILE TO MONGODB
export const newlist = ({
  token,
  buasri_id,
  member,
  email,
  phone,
  type,
  topic,
  detail,
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
  const body = JSON.stringify({
    token,
    buasri_id,
    type,
    member,
    email,
    phone,
    topic,
    detail,
    status,
    file_name,
    file_path,
  });
  // console.log(body);
  axios
    .put("http://localhost:5002/api/list/user/add", body, config)
    .then((res) => {
      dispatch({
        type: COMPLAINT_ADD_LIST,
      });
    })
    .catch((err) => {
      dispatch({
        type: COMPLAINT_ERROR,
        payload: err.data,
      });
    });
};
