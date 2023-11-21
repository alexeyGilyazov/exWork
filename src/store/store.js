import { configureStore } from "@reduxjs/toolkit";
import vacantionsReducer from './../slice/vacantionSlice'

export default configureStore({
  reducer: {
    vacantion: vacantionsReducer,
  },
})