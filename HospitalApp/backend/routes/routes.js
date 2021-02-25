const express = require("express");
const router = express.Router();
const {
  getEmployees,
  getEmployee,
  createEmployee,
  deleteEmployee,
} = require("../controllers/employeeController");

router.get("/employees", getEmployees);
router.get("/employees/:id", getEmployee);
router.post("/employees", createEmployee);
router.delete("/employees/:id", deleteEmployee);

module.exports = router;
