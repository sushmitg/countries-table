import { useState, useEffect, useCallback } from "react";
import useFetchCountries from "./useFetchCountries"; // Import custom hook for fetching data

const useToggleTable = (countries) => {
  const [showTable, setShowTable] = useState(false);
  const { fetchData } = useFetchCountries();

  // Fetch countries when the table is shown and the countries list is empty
  useEffect(() => {
    if (showTable && countries.length === 0) {
      fetchData();
    }
  }, [showTable, countries.length, fetchData]);

  const toggleShowTable = useCallback(() => setShowTable((prev) => !prev));

  return { showTable, toggleShowTable };
};

export default useToggleTable;
