import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

const useActions = (actionsCreators) => {
  const dispatch = useDispatch();
  return bindActionCreators(actionsCreators, dispatch);
};

export default useActions;
