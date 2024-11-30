import useActions from "./useActions";
import { countriesActionsCreators } from "../../redux/slice/countries-slice";

const useCountriesActions = () => useActions(countriesActionsCreators);

export default useCountriesActions;
