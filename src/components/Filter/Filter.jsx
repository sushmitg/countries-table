import React, { useCallback, useEffect, useState } from "react";
import useCountriesActions from "../../redux/hooks/useCountriesActions";
import Button from "../Buttons/Button";

import "./Filter.css";

const Filter = ({ showTable, countriesExist }) => {
  const { resetFilteredCountries, applyCountriesFilter } =
    useCountriesActions();
  const [nameFilter, setNameFilter] = useState("");
  const [populationFilter, setPopulationFilter] = useState("");

  // To check if filter values have changed
  const applyFilters = useCallback(
    (newNameFilter, newPopulationFilter) => {
      if (
        newNameFilter !== nameFilter ||
        newPopulationFilter !== populationFilter
      ) {
        applyCountriesFilter({
          nameFilter: newNameFilter,
          populationFilter: newPopulationFilter,
        });
      }
    },
    [nameFilter, populationFilter]
  );

  // Handle name filter change
  const handleNameChange = (e) => {
    const newNameFilter = e.target.value;
    setNameFilter(newNameFilter);
    applyFilters(newNameFilter, populationFilter);
  };

  // Handle population filter change
  const handlePopulationChange = (e) => {
    const newPopulationFilter = e.target.value;
    setPopulationFilter(newPopulationFilter);
    applyFilters(nameFilter, newPopulationFilter);
  };

  const clearFilters = () => {
    setNameFilter("");
    setPopulationFilter("");
    resetFilteredCountries();
  };

  const isFilterApplied = nameFilter !== "" || populationFilter !== "";

  useEffect(() => {
    if (!showTable && isFilterApplied) {
      clearFilters();
    }
  }, [showTable, isFilterApplied]);

  return (
    <div className="country-filters">
      <input
        className={`country-search-filter ${nameFilter ? "hasValue" : ""}`}
        type="text"
        placeholder="Country Name"
        value={nameFilter}
        onChange={handleNameChange}
        disabled={!showTable || !countriesExist}
      />
      <select
        className={`population-filter-btn ${
          populationFilter ? "hasValue" : ""
        }`}
        value={populationFilter}
        onChange={handlePopulationChange}
        disabled={!showTable || !countriesExist}
      >
        <option value="">Population</option>
        <option value="1M">&lt; 1 M</option>
        <option value="5M">&lt; 5 M</option>
        <option value="10M">&lt; 10 M</option>
      </select>

      <Button
        className="clear-filter-btn"
        variant="link"
        disabled={!countriesExist || !isFilterApplied}
        onClick={clearFilters}
        label="Clear"
        title="Clear all filters"
      />
    </div>
  );
};

export default Filter;
