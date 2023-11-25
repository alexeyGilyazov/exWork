import { createSlice } from "@reduxjs/toolkit";

export const vacantionSlice = createSlice({
  name: 'vacantion',
  initialState: {
    vacantions: {
      results: {
        vacancies: []
      },
      searchQuery: '',
      filteredVacantions: []
    }
  },
  reducers: {
    setVacancies: (state, action) => {
      state.vacantions.results.vacancies = [
        ...state.vacantions.results.vacancies,
        ...action.payload.results.vacancies
      ];
    },
    setFilteredVacantions: (state, action) => {
      state.vacantions.results.vacancies = action.payload
    },
    sortVacancies: (state, action) => {
      const sortType = action.payload;
      state.vacantions.results.vacancies.sort((a, b) => {
        if (sortType === 'salaryDown') {
          const salaryA = parseFloat(a.vacancy.salary_min) || 0;
          const salaryB = parseFloat(b.vacancy.salary_min) || 0;
          return salaryB - salaryA;
        }
        if (sortType === 'salaryUp') {
          const salaryA = parseFloat(a.vacancy.salary_min) || 0;
          const salaryB = parseFloat(b.vacancy.salary_min) || 0;
          return salaryA - salaryB;
        }
        return 0;
      });
    },
    searchRegionReducer: (state, action) => {
      state.vacantions.results.vacancies = action.payload
    },
    openVacancy: (state, action) => {
      state.vacantions.results.vacancies = action.payload
    }
  },
});

export const { setVacancies, setFilteredVacantions, sortVacancies, searchRegionReducer, openVacancy } = vacantionSlice.actions;
export default vacantionSlice.reducer;
