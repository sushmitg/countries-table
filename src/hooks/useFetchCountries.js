import { useCallback, useRef } from "react";
import useCountriesActions from "../redux/hooks/useCountriesActions";

const useFetchCountries = () => {
  const { fetchCountries } = useCountriesActions();
  const abortCountriesFetchRef = useRef(null);

  const fetchData = useCallback(() => {
    // Abort the previous request if any
    abortCountriesFetchRef.current?.abort();
    abortCountriesFetchRef.current = fetchCountries();
  });

  return { fetchData };
};

export default useFetchCountries;
