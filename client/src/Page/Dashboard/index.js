import React, { useState } from "react";
import Swal from "sweetalert2";
import DashboardHeader from "./DashboardHeader";
import List from "./List";
import Add from "./Add";
import Edit from "./Edit";
import { useDispatch, useSelector } from "react-redux";
import {
  updateEmployee,
  deleteEmployee,
  clockInEmployee,
  clockOutEmployee,
} from "../../redux/employee/employeeAction";
import axios from "axios";

function Dashboard() {
  const dispatch = useDispatch();
  const { employees } = useSelector((state) => state.employees);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = (id) => {
    const employee = employees.find((employee) => employee._id === id);

    if (!employee) {
      console.error("Employee not found for editing with ID:", id);
      return;
    }

    setSelectedEmployee(employee);
    setIsEditing(true);
  };

  const handleUpdate = async (updatedData) => {
    if (!selectedEmployee || !selectedEmployee._id) {
      console.error("Cannot update employee. Missing employee data or ID.");
      return;
    }

    try {
      await dispatch(updateEmployee(selectedEmployee._id, updatedData));
      setIsEditing(false);
      setSelectedEmployee(null);
      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: `${selectedEmployee.firstName} ${selectedEmployee.lastName}'s data has been updated.`,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Error updating employee:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to update employee data.",
        showConfirmButton: true,
      });
    }
  };

  const handleDelete = (employee) => {
    Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteEmployee(employee._id));
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: `${employee.firstName} ${employee.lastName}'s data has been deleted.`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const handleClockIn = (employeeId) => {
    axios
      .post(`http://localhost:4050/api/attendance/clockIn`, {
        employeeId: employeeId,
        location: { latitude: 25.1234, longitude: 80.5678 },
      })
      .then((response) => {
        dispatch(clockInEmployee(employeeId, response.data.clockInTime));
      })
      .catch((error) => {
        console.error("Error clocking in:", error);
      });
  };

  const handleClockOut = async (employeeId) => {
    try {
      const response = await axios.post(
        "http://localhost:4050/api/attendance/clockOut",
        {
          employeeId,
          clockOutTime: new Date(),
          overtimeHours: 0,
        }
      );
      dispatch(
        clockOutEmployee(
          employeeId,
          response.data.clockOutTime,
          response.data.overtimeHours
        )
      );
    } catch (error) {
      console.error("Error clocking out employee:", error);
    }
  };

  return (
    <div className="container">
      <DashboardHeader setIsAdding={setIsAdding} />
      {!isAdding && !isEditing && (
        <List
          employees={employees}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          handleClockIn={handleClockIn}
          handleClockOut={handleClockOut}
        />
      )}
      {isAdding && <Add employees={employees} setIsAdding={setIsAdding} />}
      {isEditing && (
        <Edit
          employees={employees}
          selectedEmployee={selectedEmployee}
          handleUpdate={handleUpdate}
          setIsEditing={setIsEditing}
        />
      )}
    </div>
  );
}

export default Dashboard;
