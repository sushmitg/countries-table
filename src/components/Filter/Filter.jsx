import React, { useEffect, useState } from 'react';
import Button from '../Buttons/Button';

import './Filter.css';

const Filter = ({ showTable, countries, setFilteredCountries, applyFilters }) => {
  const [nameFilter, setNameFilter] = useState('');
  const [populationFilter, setPopulationFilter] = useState('');

  const handleNameChange = (e) => {
    setNameFilter(e.target.value);
    applyFilters(e.target.value, populationFilter);
  };

  const handlePopulationChange = (e) => {
    setPopulationFilter(e.target.value);
    applyFilters(nameFilter, e.target.value);
  };

  const clearFilters = () => {
    setNameFilter('');
    setPopulationFilter('');
    setFilteredCountries(countries);
  };

  useEffect(() => {
    clearFilters();
  }, [showTable])
  

  return (
    <div className='country-filters'>
      <input
        className='country-search-filter'
        type="text"
        placeholder="Country Name"
        value={nameFilter}
        onChange={handleNameChange}
        disabled={!showTable}
      />
      <select className='population-filter-btn' value={populationFilter} onChange={handlePopulationChange} disabled={!showTable}>
        <option value="">Population</option>
        <option value="1M">&lt; 1 M</option>
        <option value="5M">&lt; 5 M</option>
        <option value="10M">&lt; 10 M</option>
      </select>

      <Button className='clear-filter-btn' variant='link' disabled={!(nameFilter || populationFilter)} onClick={clearFilters} label="Clear" title="Clear all filters" />
    </div>
  );
};

export default Filter;
