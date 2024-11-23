import React, { useState, Suspense, lazy, useCallback } from "react";
import axios from "axios";
import Filter from "./components/Filter/Filter.jsx";
import ShowTableButton from "./components/ShowTableButton/ShowTableButton.jsx";

const CountriesTable = lazy(() =>
  import("./components/CountriesTable/CountriesTable.jsx")
);

import "./App.css";

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await axios.get(
        "https://api.sampleapis.com/countries/countries"
      );
      setCountries(response.data);
      setFilteredCountries(response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const applyFilters = useCallback(
    (nameFilter, populationFilter) => {
      let filtered = countries;

      // Apply name filter
      if (nameFilter) {
        filtered = filtered.filter((country) =>
          country.name.toLowerCase().includes(nameFilter.toLowerCase())
        );
      }

      // Apply population filter
      if (populationFilter) {
        switch (populationFilter) {
          case "1M":
            filtered = filtered.filter(
              (country) => country.population < 1000000
            );
            break;
          case "5M":
            filtered = filtered.filter(
              (country) => country.population < 5000000
            );
            break;
          case "10M":
            filtered = filtered.filter(
              (country) => country.population < 10000000
            );
            break;
          default:
            break;
        }
      }

      setFilteredCountries(filtered);
    },
    [countries]
  );

  const toggleShowTable = useCallback(() => {
    console.log("toggleShowTable");

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
          <Filter
            showTable={showTable}
            countries={countries}
            setFilteredCountries={setFilteredCountries}
            applyFilters={applyFilters}
          />
          <ShowTableButton
            showTable={showTable}
            toggleShowTable={toggleShowTable}
          />
        </div>
      </div>
      <div className="country-body">
        {showTable && (
          <Suspense fallback={<p>Loading...</p>}>
            <CountriesTable isLoading={isLoading} data={filteredCountries} />
          </Suspense>
        )}
      </div>
    </div>
  );
};

export default App;
