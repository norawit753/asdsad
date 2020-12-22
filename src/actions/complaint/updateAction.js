import axios from "axios";
import {
  COMPLAINT_UPDATE_LIST,
  COMPLAINT_ERROR,
} from "../../type/complaint/type";

// Update Status
export const sendUpdateStatus = (
  { id, buasri_id, status, note, file_name, file_path },
  token
) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token,
    },
  };
  const body = JSON.stringify({
    id,
    buasri_id,
    status,
    note,
    file_name,
    file_path,
  });
  //   console.log(body);
  axios
    .put("http://localhost:5002/api/update/status", body, config)
    .then((res) => {
      dispatch({
        type: COMPLAINT_UPDATE_LIST,
      });
    })
    .catch((err) => {
      dispatch({
        type: COMPLAINT_ERROR,
        payload: err.data,
      });
    });
};
