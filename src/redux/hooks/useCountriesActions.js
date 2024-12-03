import useActions from "./useActions";
import { countriesActions } from "../../redux/slice/countries-slice";

const useCountriesActions = () => useActions(countriesActions);

export default useCountriesActions;
