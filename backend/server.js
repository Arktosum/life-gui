const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then((data) => console.log("MongoDB connected", data.connection.host))
  .catch((err) => console.error("MongoDB connection error:", err));

// app.use('/users', userRouter);

app.get("/", (req, res) => {
  res.send("<h1>Welcome to the backend!</h1>");
});

const PORT = process.env.PORT || 8080;

app.listen(() => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
