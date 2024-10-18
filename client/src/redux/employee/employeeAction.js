import axios from "axios";
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

export const signup = (userData) => async (dispatch) => {
  try {
    const res = await axios.post(
      "http://localhost:4050/users/register",
      userData
    );
    dispatch({ type: SIGNUP_SUCCESS, payload: res.data });
    return res.data;
  } catch (error) {
    dispatch({ type: SIGNUP_FAIL, payload: error.response?.data });
    throw error;
  }
};

export const login = (userData) => async (dispatch) => {
  try {
    const res = await axios.post("http://localhost:4050/users/login", userData);
    localStorage.setItem("token", res.data.token);
    dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    return res.data;
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response?.data });
    throw error;
  }
};

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("No token found in localStorage");
  }
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const addEmployee = (employee) => async (dispatch) => {
  try {
    const res = await axios.post(
      "http://localhost:4050/api/employees",
      employee,
      getAuthHeaders()
    );
    dispatch({
      type: ADD_EMPLOYEE,
      employee: res.data,
    });
  } catch (error) {
    console.error(
      "Error adding employee:",
      error.response ? error.response.data : error.message
    );
  }
};

export const updateEmployee = (id, updatedData) => async (dispatch) => {
  try {
    const response = await axios.put(
      `http://localhost:4050/api/dashboard/employeeupdate/${id}`,
      updatedData,
      getAuthHeaders()
    );
    dispatch({
      type: UPDATE_EMPLOYEE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    console.error("Error updating employee:", error);
    dispatch({
      type: UPDATE_EMPLOYEE_FAILURE,
      payload: error.response?.data || "Error occurred while updating employee",
    });
  }
};

export const deleteEmployee = (id) => async (dispatch) => {
  if (!id) {
    console.error("Error: Missing employee ID for deletion.");
    return;
  }

  try {
    await axios.delete(
      `http://localhost:4050/api/dashboard/employeedelete/${id}`,
      getAuthHeaders()
    );
    dispatch({
      type: DELETE_EMPLOYEE,
      id,
    });
  } catch (error) {
    console.error(
      "Error deleting employee:",
      error.response ? error.response.data : error.message
    );
  }
};

export const clockInEmployee = (employeeId, clockInTime) => {
  return {
    type: CLOCK_IN_EMPLOYEE,
    employeeId,
    clockInTime,
  };
};

export const clockOutEmployee = (employeeId, clockOutTime, overtimeHours) => {
  return {
    type: CLOCK_OUT_EMPLOYEE,
    employeeId,
    clockOutTime,
    overtimeHours,
  };
};
