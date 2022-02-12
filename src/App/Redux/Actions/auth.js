import { LOGIN_USER, SET_LOCATION, PROFILES } from '../type';

export const loginUser = (userdata) => {
  console.log("userdata for dis---->", userdata);
  return async (dispatch) => {
    if (userdata && userdata._id) {
      dispatch({
        type: LOGIN_USER,
        payload: userdata,
      });
    }
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    dispatch({
      type: LOGIN_USER,
      payload: null,
    });
  };
};