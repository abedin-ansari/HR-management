const Employee = require("../models/employ.model");

exports.addEmployee = async (req, res) => {
  try {
    const newEmployee = new Employee({
      ...req.body,
      userId: req.userId,
    });
    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
