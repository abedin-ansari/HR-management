// const mongoose = require("mongoose");

// const employeeSchema = new mongoose.Schema({
//   firstName: { type: String, required: true },
//   lastName: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   department: { type: String, required: true },
//   salary: { type: Number, required: true },
//   phoneNumber: { type: String, required: true },
//   address: { type: String, required: true },
//   jobRole: { type: String, required: true },
//   performanceHistory: {
//     type: [
//       {
//         date: { type: Date, default: Date.now },
//         review: String,
//       },
//     ],
//     default: [],
//   },
//   date: { type: Date, default: Date.now },
//   clockInTime: Date,
//   clockOutTime: Date,
//   overtimeHours: { type: Number, default: 0 },
//   leaves: [
//     {
//       leaveType: String,
//       startDate: Date,
//       endDate: Date,
//       status: { type: String, default: "pending" },
//     },
//   ],
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // New field to associate with HR (User)
// });

// const employeModel = mongoose.model("Employee", employeeSchema);

// module.exports = { employeModel };

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
  clockInTime: { type: Date, default: null }, // Add clockInTime field
  clockOutTime: { type: Date, default: null }, // Add clockOutTime field
  overtimeHours: { type: Number, default: 0 }, // Add overtime field
  leaves: { type: Array, default: [] }, // Add leaves field
  date: { type: Date, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Link to User model
});

const Employee = mongoose.model("Employee", employeeSchema);
module.exports = Employee;

// const mongoose = require("mongoose");

// const employeeSchema = new mongoose.Schema({
//   firstName: { type: String, required: true },
//   lastName: { type: String, required: true },
//   email: { type: String, required: true },
//   department: { type: String, required: true },
//   salary: { type: Number, required: true },
//   phoneNumber: { type: String, required: true },
//   address: { type: String, required: true },
//   jobRole: { type: String, required: true },
//   performanceHistory: [{ review: String }],
//   date: { type: Date, required: true },
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Associate with User model
// });

// const employeModel = mongoose.model("Employee", employeeSchema);

// module.exports = { employeModel };
