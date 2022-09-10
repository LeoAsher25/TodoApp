import { createAction } from "@reduxjs/toolkit";
import axiosInstance from "src/api/axiosInstance";
import { RequestStatus } from "src/constant";
import { settingSliceActions } from "src/services/setting/settingSlice";
import { userSliceActions } from "src/services/user/userSlice";

export const userRequest = {
  getProfile: async function (dispatch) {
    try {
      const url = "/user";
      dispatch(
        settingSliceActions.setItem({
          requestStatus: RequestStatus.PENDING,
        })
      );
      const response = await axiosInstance.get(url);
      dispatch(userSliceActions.getProfile(response.data));
      dispatch(
        settingSliceActions.setItem({
          requestStatus: RequestStatus.SUCCESS,
        })
      );
    } catch (err) {
      return err.response;
    }
  },

  getAllUsers: async function (dispatch) {
    try {
      const url = "/all-users";
      dispatch(
        settingSliceActions.setItem({
          requestStatus: RequestStatus.PENDING,
        })
      );
      const response = await axiosInstance.get(url);
      dispatch(userSliceActions.getAllUsers(response.data));
      dispatch(
        settingSliceActions.setItem({
          requestStatus: RequestStatus.SUCCESS,
        })
      );
    } catch (err) {
      dispatch(
        settingSliceActions.setItem({
          requestStatus: RequestStatus.ERROR,
        })
      );
      return err.response;
    }
  },

  getUserDetail: async function (userId, dispatch) {
    try {
      dispatch(
        settingSliceActions.setItem({
          requestStatus: RequestStatus.PENDING,
        })
      );
      const url = `/user-details?id=${userId}`;
      const response = await axiosInstance.get(url);
      dispatch(
        settingSliceActions.setItem({
          requestStatus: RequestStatus.SUCCESS,
        })
      );

      return response.data;
    } catch (err) {
      dispatch(
        settingSliceActions.setItem({
          requestStatus: RequestStatus.ERROR,
        })
      );
      console.log("err: ", err);
    }
  },

  updateEmployeeInfo: async function (data, dispatch, cb) {
    try {
      dispatch(
        settingSliceActions.setItem({
          requestStatus: RequestStatus.PENDING,
        })
      );
      const url = `/update-employee-info`;
      const response = await axiosInstance.post(url, data);
      dispatch(
        settingSliceActions.setItem({
          requestStatus: RequestStatus.SUCCESS,
        })
      );
      cb();
      return response.data;
    } catch (err) {
      dispatch(
        settingSliceActions.setItem({
          requestStatus: RequestStatus.ERROR,
        })
      );
      console.log("err: ", err);
    }
  },

  updateEmployeeAuthInfo: async function (data, dispatch, cb) {
    try {
      dispatch(
        settingSliceActions.setItem({
          requestStatus: RequestStatus.PENDING,
        })
      );
      const url = `/update-employee-auth-info`;
      const response = await axiosInstance.post(url, data);
      dispatch(
        settingSliceActions.setItem({
          requestStatus: RequestStatus.SUCCESS,
        })
      );
      cb();
      return response.data;
    } catch (err) {
      dispatch(
        settingSliceActions.setItem({
          requestStatus: RequestStatus.ERROR,
        })
      );
      console.log("err: ", err);
    }
  },
};

export default userRequest;
