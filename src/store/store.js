import { configureStore } from "@reduxjs/toolkit";
import vacantionsReducer from './../slice/vacantionSlice'
import favoriteReducer from './../slice/favoriteSlice'

export default configureStore({
  reducer: {
    vacantion: vacantionsReducer,
    favorite: favoriteReducer,
  },
})