import {
  START_APP,
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "../../type/main/type";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  isLoading: false,
  user: {
    id: null,
    buasri_id: null,
    title: null,
    firstname: null,
    lastname: null,
    email: null,
    dep: null,
    position: null,
    type: null,
    active: null,
  },
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
      };
    case REGISTER_SUCCESS:
      const regisSuccess = action.payload;
      console.log(regisSuccess);
      localStorage.setItem("token", regisSuccess.token);
      return regisSuccess
        ? {
            ...state,
            token: regisSuccess.token,
            user: {
              id: regisSuccess.user.id,
              buasri_id: regisSuccess.user.buasri_id,
              title: regisSuccess.user.title,
              firstname: regisSuccess.user.firstname,
              lastname: regisSuccess.user.lastname,
              email: regisSuccess.user.email,
              dep: regisSuccess.user.dep,
              position: regisSuccess.user.position,
              type: regisSuccess.user.type,
              active: regisSuccess.user.active,
            },
            isAuthenticated: true,
            isLoading: false,
          }
        : {
            ...state,
          };
    case LOGIN_SUCCESS:
      const userLoad = action.payload;
      localStorage.setItem("token", userLoad.token);
      return userLoad
        ? {
            ...state,
            token: userLoad.token,
            user: {
              id: userLoad.user.id,
              buasri_id: userLoad.user.buasri_id,
              title: userLoad.user.title,
              firstname: userLoad.user.firstname,
              lastname: userLoad.user.lastname,
              email: userLoad.user.email,
              dep: userLoad.user.dep,
              position: userLoad.user.position,
              type: userLoad.user.type,
              active: userLoad.user.active,
            },
            isAuthenticated: true,
            isLoading: false,
          }
        : {
            ...state,
          };
    case LOGIN_FAIL:
      localStorage.removeItem("token");
      return {
        token: null,
        isAuthenticated: false,
        isLoading: false,
        user: {
          id: null,
          buasri_id: null,
          title: null,
          firstname: null,
          lastname: null,
          email: null,
          dep: null,
          position: null,
          type: null,
          active: null,
        },
      };
    case LOGOUT_SUCCESS:
      localStorage.removeItem("token");
      return {
        token: null,
        isAuthenticated: false,
        isLoading: false,
        user: {
          id: null,
          buasri_id: null,
          title: null,
          firstname: null,
          lastname: null,
          email: null,
          dep: null,
          position: null,
          type: null,
          active: null,
        },
      };
    case REGISTER_FAIL:
      localStorage.removeItem("token");
      return {
        token: null,
        isAuthenticated: false,
        isLoading: false,
        user: {
          id: null,
          buasri_id: null,
          title: null,
          firstname: null,
          lastname: null,
          email: null,
          dep: null,
          position: null,
          type: null,
          active: null,
        },
      };
    case AUTH_ERROR:
    default:
      return state;
  }
}
