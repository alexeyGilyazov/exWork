import { createSlice } from '@reduxjs/toolkit'

const bookSlice = createSlice({
  name: 'books',
  initialState: {
    data: [],
  },
  reducers: {
    fetchBooks: (state, action) => {
      state.data = action.payload
    },
  },
})

export const { fetchBooks } = bookSlice.actions
export default bookSlice.reducer
