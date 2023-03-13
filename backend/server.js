const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000
app.use(express.json());
app.use(cors());

let mongodbURI = `mongodb+srv://siddhujaykay2:shiine1984@life-cluster.zopfx6x.mongodb.net/main?retryWrites=true&w=majority`



const todoRoute = require("./routes/todos.js");
app.use("/api/todos", todoRoute);

const financeRoute = require("./routes/finances");
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