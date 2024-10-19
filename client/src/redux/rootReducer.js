import { combineReducers } from "redux";
import { employeeReducer } from "./employee/employeeReducer";

const rootReducer = combineReducers({
  employees: employeeReducer,
});

export default rootReducer;
