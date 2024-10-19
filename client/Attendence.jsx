import React, { useState } from "react";
import axios from "axios";

const Attendance = ({ employeeId }) => {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [leave, setLeave] = useState({
    leaveType: "",
    startDate: "",
    endDate: "",
  });

  const handleClockIn = async () => {
    if (!employeeId) {
      alert("Employee ID not found");
      return;
    }

    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      setLocation({ latitude, longitude });

      try {
        const response = await axios.post("/attendance/clockIn", {
          employeeId, // Use dynamic employee ID
          location: { latitude, longitude },
        });
        alert(response.data.message);
      } catch (error) {
        alert(error.response.data.error);
      }
    });
  };

  const handleClockOut = async () => {
    if (!employeeId) {
      alert("Employee ID not found");
      return;
    }

    try {
      const response = await axios.post("/attendance/clockOut", {
        employeeId, // Use dynamic employee ID
      });
      alert(response.data.message);
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  const handleApplyLeave = async () => {
    if (!employeeId) {
      alert("Employee ID not found");
      return;
    }

    try {
      const response = await axios.post("/attendance/applyLeave", {
        employeeId, // Use dynamic employee ID
        leaveType: leave.leaveType,
        startDate: leave.startDate,
        endDate: leave.endDate,
      });
      alert(response.data.message);
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  return (
    <div>
      <h2>Attendance Management</h2>
      <button onClick={handleClockIn}>Clock In</button>
      <button onClick={handleClockOut}>Clock Out</button>

      <h3>Apply for Leave</h3>
      <input
        type="text"
        placeholder="Leave Type"
        value={leave.leaveType}
        onChange={(e) => setLeave({ ...leave, leaveType: e.target.value })}
      />
      <input
        type="date"
        value={leave.startDate}
        onChange={(e) => setLeave({ ...leave, startDate: e.target.value })}
      />
      <input
        type="date"
        value={leave.endDate}
        onChange={(e) => setLeave({ ...leave, endDate: e.target.value })}
      />
      <button onClick={handleApplyLeave}>Apply Leave</button>
    </div>
  );
};

export default Attendance;
