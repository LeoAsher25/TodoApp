import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { authReducer } from "src/services/auth/authSlice";
import { settingReducer } from "src/services/setting/settingSlice";
import { userReducer } from "src/services/user/userSlice";

const reducer = combineReducers({
  auth: authReducer,
  setting: settingReducer,
  user: userReducer,
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
