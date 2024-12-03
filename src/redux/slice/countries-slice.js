import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { COUNTRIES_API_URL } from "../../../config";
import axios from "axios";

const populationLimits = {
  "1M": 1_000_000,
  "5M": 5_000_000,
  "10M": 10_000_000,
};

export const COUNTRIES_FETCH_STATUS = {
  IDLE: "idle",
  LOADING: "loading",
  SUCCESS: "succeeded",
  FAILED: "failed",
};

const countriesSlice = createSlice({
  name: "countries",
  initialState: {
    status: COUNTRIES_FETCH_STATUS.IDLE,
    isLoading: false,
    error: null,
    countries: [],
    filteredCountries: [],
  },
  reducers: {
    applyCountriesFilter: (state, action) => {
      const { nameFilter, populationFilter } = action.payload;

      // If no filters are applied, reset to all countries
      if (!nameFilter && !populationFilter) {
        state.filteredCountries = state.countries;
        return;
      }

      // Apply filtering based on name and population
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
  extraReducers(builder) {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.status = COUNTRIES_FETCH_STATUS.LOADING;
        state.error = null;
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        if (!Array.isArray(action.payload)) {
          state.status = COUNTRIES_FETCH_STATUS.FAILED;
          state.error = action.payload?.message || "An unknown error occurred";
          return;
        }

        state.status = COUNTRIES_FETCH_STATUS.SUCCESS;
        state.countries = action.payload;
        state.filteredCountries = action.payload;
        state.error = null;
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        if (action.meta.aborted) {
          return; // Optionally handle cancellation separately
        }

        state.status = COUNTRIES_FETCH_STATUS.FAILED;

        if (typeof action.payload?.message === "string") {
          state.error = action.payload.message || "An unknown error occurred";
        }
      });
  },
});

export const fetchCountries = createAsyncThunk(
  "countries/fetchCountries",
  async (options, thunkAPI) => {
    try {
      const response = await axios.get(COUNTRIES_API_URL, {
        ...options,
        signal: thunkAPI.signal,
      });

      return response.data;
    } catch (error) {
      console.log("error", error);
      // Use rejectWithValue to pass a custom error object to the rejected action
      if (axios.isCancel(error)) {
        console.log("Previous Request canceled", error);
        return thunkAPI.rejectWithValue({
          isCanceled: true,
          message: "Request was canceled",
        });
      }

      return thunkAPI.rejectWithValue({
        message:
          error.response?.data ||
          error.response?.data?.message ||
          error.message ||
          "Unknown error",
      });
    }
  }
);

const countriesActionsCreators = countriesSlice.actions;
export const countriesActions = {
  ...countriesActionsCreators,
  fetchCountries,
};
export const selectCountriesReducer = (state) => state.countriesReducer;
const countriesReducer = countriesSlice.reducer;

export default countriesReducer;
