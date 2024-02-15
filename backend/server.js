const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const financeRouter = require("./routes/finances"); // Adjust the path
const todoRouter = require("./routes/todos"); // Adjust the path
const friendRouter = require("./routes/friends"); // Adjust the path
const crypto = require("crypto");
require("dotenv").config();
const jwt = require("jsonwebtoken");

app.use(cors());
app.use(express.json({ limit: "50mb" }));

const PORT = 8080;

const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
  console.log("Connected to the database");
});

app.use("/api/finances", financeRouter);
app.use("/api/todos", todoRouter);
app.use("/api/friends", friendRouter);

app.get("/", (req, res) => {
  res.send("<h1>Welcome to the backend!</h1>");
});

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    password: String,
  })
);

function hashPassword(password) {
  const sha256 = crypto.createHash("sha256");
  sha256.update(password);
  return sha256.digest("hex");
}

// Login and get a JWT token
const secretKey = process.env.HASH_SECRET_KEY;
app.post("/api/login", async (req, res) => {
  // incoming password is plain text!
  let { username, password } = req.body;
  password = hashPassword(password);
  const user = await User.findOne({ username });
  if (!user || user.password !== password) {
    return res.status(401).send("Invalid username or password.");
  }
  const token = jwt.sign({ username: user.username }, secretKey);
  res.send({ token });
});

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
