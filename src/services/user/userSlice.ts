import { createSlice } from "@reduxjs/toolkit";
import userThunkActions from "src/services/user/userThunkActions";
import { UserDto } from "src/types/userTypes";
import { getLocalStorage, setLocalStorage } from "src/utils/localStorage";

interface UserState {
  currentUser: UserDto | null;
}

const initialState: UserState = {
  currentUser: getLocalStorage("currentUser"),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userThunkActions.getProfile.fulfilled, (state, action) => {
      const currentUser = action.payload.data;
      setLocalStorage("currentUser", currentUser);
      state.currentUser = currentUser;
    });
  },
});

export const userReducer = userSlice.reducer;

export const userSliceActions = userSlice.actions;
