const mongoose = require("mongoose")

const taskScema = mongoose.Schema({
  task : {
    type : String,
    required : [true,"Task is required "],
    trim : true,
    unique : [true,"task must be unique"]
  }
})
const taskModel = mongoose.model("Task",taskScema);
module.exports = taskModel