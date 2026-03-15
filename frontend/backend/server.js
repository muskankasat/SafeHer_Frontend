const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb+srv://muskanlkasat_db_user:XjlPzleRhoGn1IBg@cluster0.fkolf3k.mongodb.net/?appName=Cluster0")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Routes
const reportRoutes = require("./routes/reportRoutes");
app.use("/api/reports", reportRoutes);

const userRoutes = require("./routes/userRoutes");//for authentication
app.use("/api/users", userRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

