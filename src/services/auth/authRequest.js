import { createAction } from "@reduxjs/toolkit";
import axiosInstance from "src/api/axiosInstance";
import { authSliceActions } from "src/services/auth/authSlice";
import { routerPaths } from "src/constant";

export const authRequest = {
  login: async function (data, dispatch) {
    try {
      const url = "/login";
      const res = await axiosInstance.post(url, data);
      dispatch(authSliceActions.loginSuccess(res.data));
    } catch (err) {
      dispatch(authSliceActions.loginFail(err));
    }
  },

  logout: async function (dispatch) {
    try {
      const url = "/logout";
      const response = await axiosInstance.get(url);
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
