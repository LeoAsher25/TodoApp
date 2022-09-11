import { createSlice } from "@reduxjs/toolkit";
import usersActions from "src/services/user/userRequest";
import { UserDto } from "src/types/userTypes";
import { getLocalStorage, setLocalStorage } from "src/utils/localStorage";

const initialState = {
  currentUser: getLocalStorage("currentUser"),
  allUsers: [],
  allNoti: [
    {
      id: 141,
      catid: 1,
      root: 140,
      content: "phongw update todo Tuần 4 in group Kế hoạch tháng 9",
      link: "/to-do/1/6",
      status: 0,
      created_at: "2022-09-10T19:55:59.000000Z",
      updated_at: "2022-09-10T19:55:59.000000Z",
    },
    {
      id: 138,
      catid: 1,
      root: 137,
      content: "phongw update todo Tuần 4 in group Kế hoạch tháng 9",
      link: "/to-do/1/6",
      status: 0,
      created_at: "2022-09-10T19:55:53.000000Z",
      updated_at: "2022-09-10T19:55:53.000000Z",
    },
    {
      id: 135,
      catid: 1,
      root: 134,
      content: "phongw update todo Tuần 3 in group Kế hoạch tháng 9",
      link: "/to-do/1/5",
      status: 0,
      created_at: "2022-09-10T19:12:01.000000Z",
      updated_at: "2022-09-10T19:12:01.000000Z",
    },
    {
      id: 132,
      catid: 1,
      root: 131,
      content: "phongw update todo Tuần 3 in group Kế hoạch tháng 9",
      link: "/to-do/1/5",
      status: 0,
      created_at: "2022-09-10T19:12:00.000000Z",
      updated_at: "2022-09-10T19:12:00.000000Z",
    },
    {
      id: 129,
      catid: 1,
      root: 128,
      content: "phongw update Group 1",
      link: "/to-do/6",
      status: 0,
      created_at: "2022-09-10T16:40:06.000000Z",
      updated_at: "2022-09-10T16:40:06.000000Z",
    },
  ],
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
    getAllNoti(state, action) {
      const allNoti = action.payload;
      state.allNoti = allNoti;
    },
  },
});

export const userReducer = userSlice.reducer;

export const userSliceActions = userSlice.actions;
