import {
  ADD_EMPLOYEE,
  UPDATE_EMPLOYEE,
  DELETE_EMPLOYEE,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  CLOCK_IN_EMPLOYEE,
  CLOCK_OUT_EMPLOYEE,
  UPDATE_EMPLOYEE_SUCCESS,
  UPDATE_EMPLOYEE_FAILURE,
} from "./employeeTypes";

const initialState = {
  employees: [],
  error: null,
  isAuthenticated: false,
  user: null,
};

export const employeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_EMPLOYEE:
      return {
        ...state,
        employees: [...state.employees, action.employee],
      };
    case UPDATE_EMPLOYEE:
      return {
        ...state,
        employees: state.employees.map((employee) => {
          if (employee._id === action.employee._id) {
            return { ...employee, ...action.employee };
          }
          return employee;
        }),
      };
    case UPDATE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        employees: state.employees.map((employee) => {
          if (employee._id === action.payload._id) {
            return { ...employee, ...action.payload };
          }
          return employee;
        }),
        error: null,
      };
    case UPDATE_EMPLOYEE_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case CLOCK_IN_EMPLOYEE:
      return {
        ...state,
        employees: state.employees.map((employee) => {
          if (employee._id === action.employeeId) {
            return {
              ...employee,
              clockInTime: action.clockInTime,
              status: "Clocked In",
            };
          }
          return employee;
        }),
      };
    case CLOCK_OUT_EMPLOYEE:
      return {
        ...state,
        employees: state.employees.map((employee) => {
          if (employee._id === action.employeeId) {
            return {
              ...employee,
              clockOutTime: action.clockOutTime,
              overtimeHours: action.overtimeHours,
              clockInTime: null,
              status: "Clocked Out",
            };
          }
          return employee;
        }),
      };
    case DELETE_EMPLOYEE:
      return {
        ...state,
        employees: state.employees.filter(
          (employee) => employee._id !== action.id
        ),
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        error: null,
      };
    case SIGNUP_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        error: null,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
