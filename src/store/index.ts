import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import modalReducer from "./slices/modalSlice";
import categoriesReducer from "./slices/categoriesSlice";
import {userReducer} from "./user/slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    modal: modalReducer,
    categories: categoriesReducer,
    user: userReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
