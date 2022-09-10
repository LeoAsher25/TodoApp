import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError, AxiosResponse } from "axios";
import axiosInstance from "src/api/axiosInstance";
import { LoginRequestData, LoginResponseData } from "src/types/authTypes";
import { RequestStatus, ResponseWithMessage } from "src/types/commonType";
import { settingSliceActions } from "src/services/setting/settingSlice";
import userThunkActions from "src/services/user/userThunkActions";

const authThunkActions = {
  login: createAsyncThunk(
    "auth/login",
    async (data: LoginRequestData, thunkApi) => {
      try {
        const url = "/login";

        thunkApi.dispatch(
          settingSliceActions.setItem({
            requestStatus: RequestStatus.LOADING,
          })
        );
        const response: AxiosResponse<LoginResponseData, any> =
          await axiosInstance.post(url, data);
        thunkApi.dispatch(
          settingSliceActions.setItem({
            requestStatus: RequestStatus.SUCCESS,
          })
        );
        return response;
      } catch (err) {
        const error = err as AxiosError<ResponseWithMessage, LoginRequestData>;
        return thunkApi.rejectWithValue(error.response);
      }
    }
  ),

  logout: createAsyncThunk("auth/logout", async (_, thunkApi) => {
    try {
      const url = "/logout";
      const response: AxiosResponse<ResponseWithMessage, any> =
        await axiosInstance.get(url);
      return response;
    } catch (err) {
      const error = err as AxiosError<ResponseWithMessage, LoginRequestData>;
      return thunkApi.rejectWithValue(error.response);
    }
  }),
};

export default authThunkActions;
