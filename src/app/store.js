import { configureStore } from "@reduxjs/toolkit";
import historyReducer from "./historySlice";

export default configureStore({
  reducer: {
    history: historyReducer,
  },
});
