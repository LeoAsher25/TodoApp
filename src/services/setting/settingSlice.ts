import { createSlice } from "@reduxjs/toolkit";
import { RequestStatus } from "src/types/commonType";

interface SettingState {
  requestStatus: RequestStatus;
}

const initialState: SettingState = {
  requestStatus: RequestStatus.SUCCESS,
};

const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    setItem(state, action) {
      Object.assign(state, action.payload);
    },
  },
});

export const settingReducer = settingSlice.reducer;

export const settingSliceActions = settingSlice.actions;
