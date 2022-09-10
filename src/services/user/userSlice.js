import { createSlice } from "@reduxjs/toolkit";
import usersActions from "src/services/user/userRequest";
import { UserDto } from "src/types/userTypes";
import { getLocalStorage, setLocalStorage } from "src/utils/localStorage";

const initialState = {
  currentUser: getLocalStorage("currentUser"),
  allUsers: [],
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
      const allUsers = action.payload.allUsers;
      state.allUsers = allUsers;
    },
  },
});

export const userReducer = userSlice.reducer;

export const userSliceActions = userSlice.actions;
