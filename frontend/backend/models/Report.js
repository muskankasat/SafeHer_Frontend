const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema({
  incidentType: String,
  location: String,
  description: String,
  severity: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Report", ReportSchema);
