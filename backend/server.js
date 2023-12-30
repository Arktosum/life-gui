const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const financeRouter = require("./routes/finances"); // Adjust the path
const todoRouter = require("./routes/todos"); // Adjust the path

app.use(cors());
app.use(express.json());
const PORT = 8080;

const MONGODB_URI = "mongodb://localhost:27017/life-gui";
mongoose.connect(MONGODB_URI);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
  console.log("Connected to the database");
});

app.use("/api/friends", financeRouter);
app.use("/api/finances", financeRouter);
app.use("/api/todos", todoRouter);

app.get("/", (req, res) => {
  res.send("<h1>Welcome to the backend!</h1>");
});

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
