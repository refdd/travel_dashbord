import { configureStore } from "@reduxjs/toolkit";
import drawerReducer from "./drawerSlice";

export const store = configureStore({
  reducer: {
    isDrawer: drawerReducer,
  },
});
