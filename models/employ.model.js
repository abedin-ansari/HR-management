const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  department: { type: String, required: true },
  salary: { type: Number, required: true },
  phoneNumber: { type: String, required: true },
  address: { type: String, required: true },
  jobRole: { type: String, required: true },
  performanceHistory: { type: Array, default: [] },
  clockInTime: { type: Date, default: null },
  clockOutTime: { type: Date, default: null },
  overtimeHours: { type: Number, default: 0 },
  leaves: { type: Array, default: [] },
  date: { type: Date, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Employee = mongoose.model("Employee", employeeSchema);
module.exports = Employee;
