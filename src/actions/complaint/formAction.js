import axios from "axios";
import { COMPLAINT_GET_UPLOAD_FILE } from "../../type/complaint/type";

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
