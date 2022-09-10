import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allGroup: [],
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    getAllGroup(state, action) {
      const allGroup = action.payload;
      state.allGroup = allGroup;
    },
  },
});

export const todoReducer = todoSlice.reducer;

export const todoSliceActions = todoSlice.actions;
