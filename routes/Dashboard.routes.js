const express = require("express");
const multer = require("multer");
const auth = require("../middlewares/auth");
const employeModel = require("../models/employ.model");
const dashboardrouter = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

dashboardrouter.post(
  "/add",
  upload.single("document"),
  auth,
  async (req, res) => {
    const {
      firstName,
      lastName,
      email,
      department,
      salary,
      phoneNumber,
      address,
      jobRole,
      performanceHistory,
      date,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !department ||
      !salary ||
      !phoneNumber ||
      !address ||
      !jobRole ||
      !date
    ) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const newEmployee = new employeModel({
      firstName,
      lastName,
      email,
      department,
      salary,
      phoneNumber,
      address,
      jobRole,
      performanceHistory: Array.isArray(performanceHistory)
        ? performanceHistory
        : [],
      date,
      userId: req.userId,
    });

    try {
      const savedEmployee = await newEmployee.save();
      res.status(201).json({ employee: savedEmployee });
    } catch (error) {
      res.status(500).json({ error: "Error adding employee" });
    }
  }
);

dashboardrouter.post(
  "/uploadDocument",
  auth,
  upload.single("document"),
  (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const documentPath = req.file.path;
    res
      .status(200)
      .json({ message: "File uploaded successfully", documentPath });
  }
);

dashboardrouter.put(
  "/api/dashboard/employeeupdate/:id",
  auth,
  async (req, res) => {
    const { id } = req.params;
    const userId = req.userId;
    const updates = req.body;

    try {
      const employee = await employeModel.findOne({ _id: id, userId: userId });

      if (!employee) {
        return res
          .status(404)
          .json({ message: "Employee not found or unauthorized" });
      }

      Object.assign(employee, updates);

      const updatedEmployee = await employee.save();
      return res.status(200).json({
        message: "Employee updated successfully",
        employee: updatedEmployee,
      });
    } catch (error) {
      return res.status(500).json({ error: "Error updating employee" });
    }
  }
);

dashboardrouter.delete("/employeedelete/:id", auth, async (req, res) => {
  const { id } = req.params;

  try {
    const employee = await employeModel.findOneAndDelete({
      _id: id,
      userId: req.userId,
    });
    if (!employee) {
      return res
        .status(404)
        .json({ message: "Employee not found or unauthorized" });
    }

    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting employee" });
  }
});

dashboardrouter.get("/pagination", auth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};
    const totalDocuments = await employeModel
      .countDocuments({ userId: req.userId })
      .exec();

    if (endIndex < totalDocuments) {
      results.next = { page: page + 1, limit: limit };
    }
    if (startIndex > 0) {
      results.previous = { page: page - 1, limit: limit };
    }

    results.results = await employeModel
      .find({ userId: req.userId })
      .limit(limit)
      .skip(startIndex)
      .exec();
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: "Error fetching employees" });
  }
});

dashboardrouter.get("/filter/:email", auth, async (req, res) => {
  const { email } = req.params;

  try {
    const employees = await employeModel.find({ email, userId: req.userId });
    if (employees.length === 0) {
      return res.status(404).json({ message: "No employees found" });
    }

    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ error: "Error fetching employees" });
  }
});

module.exports = { dashboardrouter };
