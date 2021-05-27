import axios from "axios";
import { RESEARCH_EDIT_UPDATE } from "../../type/research/type";

// Env
import { config } from "../../utilis/config";
const conResearch = config.connectResearchAPI;
const conphp = config.connectPHP;

// POST EDIT LIST TO MONGO
export const newlist =
  ({
    token,
    _id,
    buasri_id,
    email,
    dep,
    firstname,
    lastname,
    position,
    research_name,
    article_type,
    level,
    level_sub1,
    level_sub2,
    type_name,
    quartile,
    year,
    author_type,
    research_year,
    conference_name,
    conf_country,
    conf_local,
    tags,
    note,
    file_name,
    file_path,
    status,
  }) =>
  (dispatch) => {
    // Headers
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    };

    // body
    const body = JSON.stringify({
      token,
      _id,
      buasri_id,
      year,

      email,
      dep,
      firstname,
      lastname,
      position,

      level,
      level_sub1,
      level_sub2,
      article_type,
      research_name,
      research_year,
      quartile,
      author_type,
      note,
      tags,

      type_name,
      conference_name,
      conf_country,
      conf_local,

      file_name,
      file_path,
      status,
    });
    // console.log(body);
    axios
      .post(conResearch + "/api/list/edit", body, config)
      .then((res) => {
        if (res.data) {
          dispatch({
            type: RESEARCH_EDIT_UPDATE,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
