import useActions from "./useActions";
import { countriesActionsCreators } from "../../redux/slice/countries-slice";

const useCountriesActions = () => {
  try {
    return useActions(countriesActionsCreators);
  } catch (error) {
    console.error("Error in countries actions:", error);
    return {};
  }
};

export default useCountriesActions;
