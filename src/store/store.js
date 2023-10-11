import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "./bookSlice";
import goodReducer from "./goodSlice";

const store = configureStore({
  reducer: {
    books: bookReducer,
    goods: goodReducer,
  }
})

export default store;