import { createSlice } from '@reduxjs/toolkit'

const bookSlice = createSlice({
  name: 'books',
  initialState: {
    data: [],
    loading: false
  },
  reducers: {
    fetchBooksStart: (state) => {
      state.loading = true
    },
    fetchBooksSuccess: (state, action) => {
      state.data = action.payload
      state.loading = false
    },
    fetchBooksFailure: (state) => {
      state.loading = false
    },
  },
})

export const { fetchBooksStart, fetchBooksSuccess, fetchBooksFailure } = bookSlice.actions
export default bookSlice.reducer
