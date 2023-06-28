const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config()
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());

let mongodbURI = process.env.MONGODB_URI;

const todoRoute = require("./routes/todos.js");
const financeRoute = require("./routes/finances");

app.use("/api/todos", todoRoute);
app.use("/api/finances", financeRoute);

mongoose.connect(mongodbURI,{
    useNewUrlParser: true
})
app.get('/',(req,res)=>{
  res.send("<h1>Welcome to the backend!</h1>")
})

app.listen(PORT,()=>{
    console.log(`Started Server on | http://localhost:${PORT}`);
})