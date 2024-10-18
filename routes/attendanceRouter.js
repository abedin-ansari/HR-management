const express = require("express");
const Employee = require("../models/employ.model");

const attendanceRouter = express.Router();

attendanceRouter.post("/clockIn", async (req, res) => {
  try {
    const { employeeId, location } = req.body;

    if (!employeeId || !location) {
      return res
        .status(400)
        .json({ message: "Employee ID and location are required" });
    }

    const employee = await Employee.findById(employeeId);

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    employee.clockInTime = new Date();
    await employee.save();

    res.status(200).json({
      message: "Clock in successful",
      employeeId,
      clockInTime: employee.clockInTime,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

attendanceRouter.post("/clockOut", async (req, res) => {
  const { employeeId, clockOutTime, overtimeHours } = req.body;

  try {
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    employee.clockOutTime = clockOutTime || new Date();
    employee.overtimeHours = overtimeHours || 0;
    employee.clockInTime = null;
    await employee.save();

    res.status(200).json({
      message: "Employee clocked out successfully",
      clockOutTime: employee.clockOutTime,
      overtimeHours: employee.overtimeHours,
    });
  } catch (error) {
    console.error("Error clocking out employee:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

attendanceRouter.post("/applyLeave", async (req, res) => {
  const { employeeId, leaveType, startDate, endDate } = req.body;
  const leave = { leaveType, startDate, endDate };

  await employeModel.findByIdAndUpdate(employeeId, {
    $push: { leaves: leave },
  });
  res.status(200).json({ message: "Leave applied successfully" });
});

attendanceRouter.get("/leaveStatus/:employeeId", async (req, res) => {
  const { employeeId } = req.params;
  const employee = await employeModel.findById(employeeId);
  res.status(200).json({ leaves: employee.leaves });
});

module.exports = { attendanceRouter };
