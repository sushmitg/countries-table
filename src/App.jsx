import React, { useState, Suspense, lazy, useCallback, useRef } from "react";
import { useSelector } from "react-redux";
import { COUNTRIES_API_URL } from "../config.js";
import useOnlineStatus from "./hooks/useOnline.js";
import useCountriesActions from "./redux/hooks/useCountriesActions.js";
import axios from "axios";
import Filter from "./components/Filter/Filter.jsx";
import ShowTableButton from "./components/ShowTableButton/ShowTableButton.jsx";

const CountriesTable = lazy(() =>
  import("./components/CountriesTable/CountriesTable.jsx")
);

import "./App.css";

const App = () => {
  // State hooks
  const [showTable, setShowTable] = useState(false);

  // Custom hook to check online status
  const isOnline = useOnlineStatus();

  // Redux state and actions
  const { setCountries, setIsLoading, setIsFetchError } = useCountriesActions();
  const { isLoading, isFetchError, countries, filteredCountries } = useSelector(
    (state) => state.countriesReducer
  );

  // Ref for AbortController
  const abortControllerRef = useRef(null);

  // Fetch countries data
  const fetchData = useCallback(async () => {
    if (!isOnline) {
      setIsFetchError(true); // Show error if offline
      return;
    }

    setIsLoading(true);
    setIsFetchError(false);

    // Abort previous request if any
    abortControllerRef.current?.abort();
    abortControllerRef.current = new AbortController();

    try {
      const response = await axios.get(COUNTRIES_API_URL, {
        signal: abortControllerRef.current?.signal,
      });

      if (response.data.error) {
        setIsFetchError(true);
        console.error("Error fetching data: ", response.data.error);
        return;
      }

      setCountries(response.data);
      setIsLoading(false);
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Previous Request canceled", error.message);
      } else {
        // handle error
        setIsFetchError(true);
        console.error("Error fetching data: ", error);
      }
    }
  }, [setIsLoading, setIsFetchError, setCountries]);

  // Toggle table visibility and fetch data if needed
  const toggleShowTable = useCallback(() => {
    if (!showTable && countries.length === 0) {
      fetchData();
    }

    setShowTable((prev) => !prev);
  }, [showTable, countries.length, fetchData]);

  return (
    <div className="country-container">
      <div className="country-header">
        <h1 className="country-title">Countries Info</h1>

        <div className="country-filters-container">
          <Filter showTable={showTable} countriesExist={countries.length > 0} />
          <ShowTableButton
            showTable={showTable}
            toggleShowTable={toggleShowTable}
          />
        </div>
      </div>
      <div className="country-body">
        {showTable &&
          (isFetchError ? (
            <p className="error-message">
              {isOnline
                ? "Something went wrong. Please retry."
                : "You're offline. Check your connection and try again."}
            </p>
          ) : (
            <Suspense fallback={<p className="loading-message">Loading...</p>}>
              <CountriesTable isLoading={isLoading} data={filteredCountries} />
            </Suspense>
          ))}
      </div>
    </div>
  );
};

export default App;
