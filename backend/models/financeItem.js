const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    mode : String,
    name : String,
    category : String,
    remarks : String,
    amount : Number,
    completed : Boolean
},{ timestamps: true })

let FinanceItem = mongoose.model('finance',Schema)
module.exports = FinanceItem