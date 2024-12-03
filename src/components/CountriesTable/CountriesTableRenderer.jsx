import React, { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import useOnlineStatus from "../../hooks/useOnline";
import {
  COUNTRIES_FETCH_STATUS,
  selectCountriesReducer,
} from "../../redux/slice/countries-slice.js";

const CountriesTable = lazy(() => import("./CountriesTable.jsx"));

const CountriesTableRenderer = () => {
  const isOnline = useOnlineStatus();
  const { status, error, filteredCountries } = useSelector(
    selectCountriesReducer
  );

  if (error) {
    return (
      <p className="error-message">
        {isOnline
          ? error
          : "You're offline. Check your connection and try again."}
      </p>
    );
  }

  return (
    <Suspense fallback={<p className="loading-message">Loading Table...</p>}>
      <CountriesTable
        isLoading={status === COUNTRIES_FETCH_STATUS.LOADING}
        data={filteredCountries}
      />
    </Suspense>
  );
};

export default CountriesTableRenderer;
