const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    priority: {
      type: String,
      enum: ["LOW", "MEDIUM", "HIGH"],
      default: "LOW",
    },
    status : {
      type : String,
      enum : ["PENDING", "COMPLETED"],
      default : "PENDING"
    },
    subtasks : [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Todo",
      required: true
    }],
    isSubtask : Boolean,
    dueDate: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("todo", todoSchema);
