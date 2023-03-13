const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
  text: String,
  checked: Boolean
},{ timestamps: true })

let todoItem = mongoose.model('todos', Schema)
module.exports = todoItem