import { createAction } from "@reduxjs/toolkit";
import { authSliceActions } from "src/services/auth/authSlice";
import axiosInstance from "src/utils/axiosInstance";
import userRequest from "../user/userRequest";
import { userSliceActions } from "../user/userSlice";

export const authRequest = {
  login: async function (data, dispatch) {
    try {
      const url = "/login";
      const res = await axiosInstance.post(url, data);
      dispatch(authSliceActions.loginSuccess(res.data));
      // res.data = { access_token: '....'}
      userRequest.getProfile(dispatch);
    } catch (err) {
      dispatch(authSliceActions.loginFail(err));
    }
  },

  logout: async function (dispatch) {
    try {
      const url = "/logout";
      const response = await axiosInstance.get(url);
      dispatch(userSliceActions.logout());
      dispatch(authSliceActions.logout());
      return response;
    } catch (err) {
      return err.response;
    }
  },
};

const authActions = {
  login: createAction("LOGIN"),
  logout: createAction("LOGOUT"),
};

export default authActions;
