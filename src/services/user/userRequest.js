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

  getAllUser: async function (dispatch) {
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
};

export default userRequest;
