const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
  title: String,
  description: String,
  startedAt : Date,
  endedAt : Date,
  labels : [String],
  completed: Boolean
},{ timestamps: true })

let todoItem = mongoose.model('todos', Schema)
module.exports = todoItem