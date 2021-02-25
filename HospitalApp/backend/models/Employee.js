const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  position: {
    type: String,
    enum: ["MJEK", "INFERMIER", "SANITAR"],
  },
  payPerHour: {
    type: Number,
  },
  startDate: {
    type: Date,
  },
});

module.exports = mongoose.model("Employee", EmployeeSchema);
