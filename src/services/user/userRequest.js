import { createAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
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

  getAllNoti: async function (dispatch) {
    try {
      const url = "/notifications";
      dispatch(
        settingSliceActions.setItem({
          requestStatus: RequestStatus.PENDING,
        })
      );
      const response = await axiosInstance.get(url);
      dispatch(userSliceActions.getAllNoti(response.data.todo_noti));
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

  uploadData: async function (data, dispatch, cb) {
    try {
      dispatch(
        settingSliceActions.setItem({
          requestStatus: RequestStatus.PENDING,
        })
      );
      const url = `/upload-data`;
      const response = await axiosInstance.post(url, data, {
        headers: {
          ContentType: "multipart/form-data",
        },
      });
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

  addUser: async function (data, dispatch, cb) {
    try {
      dispatch(
        settingSliceActions.setItem({
          requestStatus: RequestStatus.PENDING,
        })
      );
      const url = `/create-user`;
      const response = await axiosInstance.post(url, data);
      // = await userRequest.getAllUsers(dispatch);
      dispatch(
        settingSliceActions.setItem({
          requestStatus: RequestStatus.SUCCESS,
        })
      );
      cb(response.data.user);
      return response.data;
    } catch (err) {
      dispatch(
        settingSliceActions.setItem({
          requestStatus: RequestStatus.ERROR,
        })
      );
      Object.values(err.data)?.forEach((item) => {
        toast.error(item[0]);
      });
      console.log("err: ", err);
    }
  },
};

export default userRequest;
