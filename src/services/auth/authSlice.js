import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
} from "src/utils/localStorage";

const initialState = {
  access_token: getLocalStorage("access_token"),
  currentUser: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginFail(state, action) {
      // toast.error("Login fail!");
    },
    loginSuccess(state, action) {
      const access_token = action.payload.access_token;
      state.access_token = access_token;
      setLocalStorage("access_token", access_token);
      toast.success("Login successfully!");
    },

    logout(state, action) {
      state.access_token = "";
      removeLocalStorage("access_token");
    },
  },
});
export const authReducer = authSlice.reducer;

export const authSliceActions = authSlice.actions;
