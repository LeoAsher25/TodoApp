import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError, AxiosResponse } from "axios";
import axiosInstance from "src/api/axiosInstance";
import { ResponseWithMessage } from "src/types/commonType";
import { UserDto } from "src/types/userTypes";

const userThunkActions = {
  getProfile: createAsyncThunk("user/getProfile", async (_, thunkApi) => {
    try {
      const url = "/user";
      const response: AxiosResponse<UserDto, any> = await axiosInstance.get(
        url
      );
      console.log("response: ", response);
      return response;
    } catch (err) {
      const error = err as AxiosError<ResponseWithMessage, any>;
      return thunkApi.rejectWithValue(error.response);
    }
  }),
};

export default userThunkActions;
