import axios from "axios";
import { SET_DEPARTMENT, CLOSE_DEPARTMENT } from "../../type/main/type";

export const setDepartment = () => (dispatch) => {
  axios.get("http://localhost:5000/api/departments").then((res) =>
    dispatch({
      type: SET_DEPARTMENT,
      payload: res.data,
    })
  );
};

export const closeDepartment = () => {
  return {
    type: CLOSE_DEPARTMENT,
  };
};
