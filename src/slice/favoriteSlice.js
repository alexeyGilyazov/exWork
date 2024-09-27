import { createSlice } from "@reduxjs/toolkit";

export const favoriteSlice = createSlice({
  name: "favorite",
  initialState: {
    favorite: [],
    quantityFavorite: 0
  },
  reducers: {
    setFavorite: (state, action) => {
      state.favorite = action.payload
    },
    addFavorite: (state, action) => {
      state.favorite.push(action.payload)
      console.log(state.favorite)
    },
    removeFavorite: (state, action) => {
      const index = state.favorite.findIndex(item => item.vacancy === action.payload.vacancy);
      if (index !== -1) {
        state.favorite.splice(index, 1);
      }
    },
    clearFavorite: (state) => {
      state.favorite = []
    },
    changeQuantity: (state) => {
      state.quantityFavorite = state.favorite.length;
    },
  }
})

export const { setFavorite, addFavorite, removeFavorite, clearFavorite, changeQuantity } = favoriteSlice.actions
export default favoriteSlice.reducer