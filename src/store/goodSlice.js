import { createSlice } from '@reduxjs/toolkit'

const goodSlice = createSlice({
  name: 'goods',
  initialState: {
    data: [],
    fetching: true,
    currentLimit: 0,
    contentLength: 0
  },
  reducers: {
    fetchGoods: (state, action) => {
      state.data = action.payload
    },
    setFetching: (state, action) => {
      state.fetching = action.payload
    },
    setCurrentLimit: (state, action) => {
      state.currentLimit = state.currentLimit + action.payload
    },
    // checkTotalLength: (state, action) => {
    //   state.contentLength = action.payload
    // }
  },
})

export const { fetchGoods, setFetching, setCurrentLimit } = goodSlice.actions
export default goodSlice.reducer