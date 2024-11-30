import React, { useState, Suspense, lazy, useCallback } from "react";
import { useSelector } from "react-redux";
import { COUNTRIES_API_URL } from "../config.js";
import useCountriesActions from "./redux/hooks/useCountriesActions.js";
import axios from "axios";
import Filter from "./components/Filter/Filter.jsx";
import ShowTableButton from "./components/ShowTableButton/ShowTableButton.jsx";

const CountriesTable = lazy(() =>
  import("./components/CountriesTable/CountriesTable.jsx")
);

import "./App.css";

const App = () => {
  const [showTable, setShowTable] = useState(false);

  const { setCountries, setIsLoading, setIsFetchError } = useCountriesActions();

  const { isLoading, isFetchError, countries, filteredCountries } = useSelector(
    (state) => state.countriesReducer
  );

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await axios.get(COUNTRIES_API_URL);

      if (response.data.error) {
        setIsFetchError(true);
        console.error("Error fetching data: ", response.data.error);
        return;
      }

      setCountries(response.data);
    } catch (error) {
      setIsFetchError(true);
      console.error("Error fetching data: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleShowTable = useCallback(() => {
    if (countries.length === 0) {
      fetchData();
    }

    setShowTable(!showTable);
  });

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
        {isFetchError && <p>Something went wrong, please reload page...</p>}

        {showTable && !isFetchError && (
          <Suspense fallback={<p>Loading...</p>}>
            <CountriesTable isLoading={isLoading} data={filteredCountries} />
          </Suspense>
        )}
      </div>
    </div>
  );
};

export default App;
