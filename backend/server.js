const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./routes/auth"); // Import the router module
const financeRouter = require("./routes/finance"); // Import the router module
const friendRouter = require("./routes/friend"); // Import the router module
const cors = require("cors");

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect("mongodb+srv://siddhujaykay2:shiine1984@life-cluster.zopfx6x.mongodb.net/main");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(express.json());
app.use(cors());
app.use("/api/auth", authRouter);
app.use("/api/finance", financeRouter);
app.use("/api/friend", friendRouter);

app.get("/", (req, res) => {
  res.send("<h1>Hello from backend!</h1>");
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
