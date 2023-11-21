import { createSlice } from "@reduxjs/toolkit";

export const vacantionSlice = createSlice({
  name: 'vacantion',
  initialState: {
    vacantions: []
  },
  reducers: {
    setVacantions: (state, action) => {
      state.vacantions = action.payload
    }
  }
})

export const { setVacantions } = vacantionSlice.actions
export default vacantionSlice.reducer