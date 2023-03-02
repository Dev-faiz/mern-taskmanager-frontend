const mongoose = require('mongoose');

// creating a schema 
const taskSchema = mongoose.Schema({
    name: { type: String , required: [true , "Please add a task"] },
    description: { type: String, required: true },
    completed: { type: Boolean, required: true , default: false }, }
   , {
        timestamps: true,
    }
    )

const Task =  mongoose.model("Task", taskSchema);
module.exports = Task;