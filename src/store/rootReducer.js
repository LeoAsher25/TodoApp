import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { authReducer } from "src/services/auth/authSlice";
import { settingReducer } from "src/services/setting/settingSlice";
import { todoReducer } from "src/services/todo/todoSlice";
import { userReducer } from "src/services/user/userSlice";

const reducer = combineReducers({
  auth: authReducer,
  setting: settingReducer,
  user: userReducer,
  todo: todoReducer,
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
