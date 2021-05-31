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
export const getlist_user =
  ({ buasri_id, token }) =>
  (dispatch) => {
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
export const getlist_committee =
  ({ dep, token }) =>
  (dispatch) => {
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

// get list admin
export const getlist_admin =
  ({ token, buasri_id }) =>
  (dispatch) => {
    // console.log(token);
    // Headers
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    };
    const body = JSON.stringify({ buasri_id });
    axios
      .post(conResearch + "/api/list/admin", body, config)
      .then((res) => {
        dispatch({
          type: RESEARCH_GET_LIST_ADMIN,
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
export const getdetail_list =
  ({ token, id, buasri_id }) =>
  (dispatch) => {
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
      // console.log(res.data);
      dispatch({
        type: RESEARCH_GET_DETAIL,
        payload: res.data,
      });
    });
  };

// update status committee
export const status_committee =
  ({
    token,
    id,
    buasri_id,
    committee,
    status,
    note,
    data_email,
    count_email,
  }) =>
  (dispatch) => {
    // Headers
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    };
    const config_email = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ id, buasri_id, committee, status, note });
    const body_email = JSON.stringify({ data_email, count_email, id, status });
    const body_email_user = JSON.stringify({ data_email, id, status });
    // console.log(conphp);
    axios
      .post(conResearch + "/api/list/status_committee", body, config)
      .then((res) => {
        if (res) {
          if (status === "WAITINGADMIN") {
            // console.log("step 1: เข้าเงื่อนไขส่งไปยัง ส่ง mail admin");
            if (count_email !== 0) {
              // console.log("step 2: เข้าเงื่อนไขหาก count_email != 0");
              axios
                .post(
                  conphp + "/research/detail/email_update_admin.php",
                  body_email,
                  config_email
                )
                .then((resEmail) => {
                  // console.log(resEmail);
                  if (resEmail.data.Result) {
                    dispatch({
                      type: RESEARCH_UPDATE_STATUS,
                    });
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
            } else {
              // console.log("step 2: เข้าเงื่อนไขหาก count_email = 0");
              dispatch({
                type: RESEARCH_UPDATE_STATUS,
              });
            }
          } else {
            // console.log("step 1: เข้าเงื่อนไขส่งไปยัง ส่ง mail user");
            axios
              .post(
                conphp + "/research/detail/email_update_user.php",
                body_email_user,
                config_email
              )
              .then((resEmail) => {
                if (resEmail.data.Result) {
                  dispatch({
                    type: RESEARCH_UPDATE_STATUS,
                  });
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }
        }
      })
      .catch((error) => {
        dispatch({
          type: RESEARCH_ERROR,
          payload: error.data,
        });
      });
  };

// update status admin
export const status_admin =
  ({ token, id, buasri_id, admin, status, note, data_email }) =>
  (dispatch) => {
    // Headers
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    };
    const config_email = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ id, buasri_id, admin, status, note });
    const body_email_user = JSON.stringify({ data_email, id, status });
    console.log("ส่งไป API " + body);
    console.log("ส่งไป PHP " + body_email_user);
    axios
      .post(conResearch + "/api/list/status_admin", body, config)
      .then((res) => {
        console.log("ส่งไปยัง PHP Email");
        axios
          .post(
            conphp + "/research/detail/email_update_user.php",
            body_email_user,
            config_email
          )
          .then((resEmail) => {
            if (resEmail.data.Result) {
              dispatch({
                type: RESEARCH_UPDATE_STATUS,
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((error) => {
        dispatch({
          type: RESEARCH_ERROR,
          payload: error.data,
        });
      });
  };
