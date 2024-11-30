import { createSlice } from "@reduxjs/toolkit";

const populationLimits = {
  "1M": 1_000_000,
  "5M": 5_000_000,
  "10M": 10_000_000,
};

const countriesSlice = createSlice({
  name: "countries",
  initialState: {
    isLoading: false,
    isFetchError: false,
    countries: [],
    filteredCountries: [],
  },
  reducers: {
    setCountries: (state, action) => {
      state.countries = action.payload;
      state.filteredCountries = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setIsFetchError: (state, action) => {
      state.isFetchError = action.payload;
    },
    applyCountriesFilter: (state, action) => {
      const { nameFilter, populationFilter } = action.payload;

      // if No Payload sent
      if (!nameFilter && !populationFilter) {
        state.filteredCountries = state.countries;
        return;
      }

      const filtered = state.countries.filter((country) => {
        const matchesName = nameFilter
          ? country.name.toLowerCase().includes(nameFilter.toLowerCase())
          : true;

        const matchesPopulation = populationFilter
          ? country.population <
            (populationLimits[populationFilter] || Infinity)
          : true;

        return matchesName && matchesPopulation;
      });

      state.filteredCountries = filtered;
    },
    resetFilteredCountries: (state) => {
      state.filteredCountries = state.countries;
    },
  },
});

export const countriesActionsCreators = countriesSlice.actions;
const countriesReducer = countriesSlice.reducer;
export default countriesReducer;
