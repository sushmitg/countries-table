import { configureStore } from "@reduxjs/toolkit";
import countriesReducer from "./slice/countries-slice";

const store = configureStore({
  reducer: {
    countriesReducer,
  },
});

// // Can still subscribe to the store
// store.subscribe(() => console.log(store.getState()))

export default store;
