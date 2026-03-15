const express = require("express");
const router = express.Router();
const Report = require("../models/Report");

router.post("/", async (req, res) => {
  try {

    const report = new Report(req.body);

    await report.save();

    res.status(201).json({
      message: "Report saved successfully",
      report
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
