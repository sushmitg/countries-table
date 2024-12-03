import useActions from "./useActions";
import { countriesActions } from "../../redux/slice/countries-slice";

const useCountriesActions = () => {
  try {
    return useActions(countriesActions);
  } catch (error) {
    console.error("Error in countries actions:", error);
    return {};
  }
};

export default useCountriesActions;
