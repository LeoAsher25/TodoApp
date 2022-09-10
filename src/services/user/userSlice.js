import { createSlice } from "@reduxjs/toolkit";
import usersActions from "src/services/user/userRequest";
import { UserDto } from "src/types/userTypes";
import { getLocalStorage, setLocalStorage } from "src/utils/localStorage";

const initialState = {
  currentUser: getLocalStorage("currentUser"),
  allUser: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getProfile(state, action) {
      const currentUser = action.payload;
      setLocalStorage("currentUser", currentUser);
      state.currentUser = currentUser;
    },
    getAllUsers(state, action) {
      const allUser = action.payload.allUsers;
      state.allUser = allUser;
    },
  },
});

export const userReducer = userSlice.reducer;

export const userSliceActions = userSlice.actions;
