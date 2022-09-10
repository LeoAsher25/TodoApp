import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allGroups: [],
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    getAllGroups(state, action) {
      const allGroups = action.payload;
      state.allGroups = allGroups;
    },
  },
});

export const todoReducer = todoSlice.reducer;

export const todoSliceActions = todoSlice.actions;
