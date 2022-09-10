import { toast } from "react-toastify";
import { createSlice } from "@reduxjs/toolkit";
import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
} from "src/utils/localStorage";
import authThunkActions from "src/services/auth/authThunkActions";
import { UserDto } from "src/types/userTypes";
interface AuthState {
  access_token: string | undefined;
  currentUser: UserDto | null;
}

const initialState: AuthState = {
  access_token: getLocalStorage("access_token"),
  currentUser: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutMethod: (state) => {
      state.access_token = "";
      removeLocalStorage("access_token");
      toast.success("Logout successfully!");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authThunkActions.login.fulfilled, (state, action) => {
        const access_token = action.payload.data.access_token;
        state.access_token = access_token;
        setLocalStorage("access_token", access_token);
        toast.success("Login successfully!");
      })
      .addCase(authThunkActions.login.rejected, (state, action) => {
        console.log("acion error: ", action.error);
        toast.error("Login fail!");
      })
      .addCase(authThunkActions.logout.fulfilled, (state, action) => {
        state.access_token = "";
        removeLocalStorage("access_token");
      });
  },
});
export const authReducer = authSlice.reducer;

export const authSliceActions = authSlice.actions;
