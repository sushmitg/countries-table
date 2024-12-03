import React from "react";
import { useSelector } from "react-redux";
import useToggleTable from "./hooks/useToggleTable.js";
import { selectCountriesReducer } from "./redux/slice/countries-slice.js";
import Filter from "./components/Filter/Filter";
import ShowTableButton from "./components/ShowTableButton/ShowTableButton";
import CountriesTableRenderer from "./components/CountriesTable/CountriesTableRenderer.jsx";

import "./App.css";

const App = () => {
  const { countries } = useSelector(selectCountriesReducer);
  const { showTable, toggleShowTable } = useToggleTable(countries);

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
        {showTable && <CountriesTableRenderer />}
      </div>
    </div>
  );
};

export default App;
