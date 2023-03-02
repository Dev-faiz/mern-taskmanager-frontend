const Task = require('../models/taskModel');

const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body);
        res.status(200).json(task);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const getAllTasks = async (req, res) => {
    console.log('getAllTasks');
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const getTask = async (req, res,) => {
    try {
        const { id } = req.params;
        const task = await Task.findById(id);
        if (!task) return res.status(404).json({ message: `Task not found with id ${id}` });
        res.status(200).json(task);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }

}

const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findByIdAndDelete(id);
        if (!task) return res.status(404).json({ message: `Task not found with id ${id}` });
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {

    }

}

const updateTask = async (req, res) => {

    try {
        const { id } = req.params;
        const task = await Task.findByIdAndUpdate(
            { _id: id },
            req.body,
            { new: true, runValidators: true });
        if (!task) return res.status(404).json({ message: `Task not found with id ${id}` });
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

const patchDescription = async ( req , res) =>{
    try {
        const { id} = req.params ;
        const task = await Task.findByIdAndUpdate({_id: id}, req.body , { new:true, runValidators : true});
        if (!task) return res.status(404).json({ message: `Task not found with id ${id}` });
        res.status(200).json(task);
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const patchCompleted = async ( req , res) =>{
    try {
        const { id} = req.params ;
        const task = await Task.findByIdAndUpdate({_id: id}, req.body , { new:true, runValidators : true});
        if (!task) return res.status(404).json({ message: `Task not found with id ${id}` });
        res.status(200).json(task);
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}



module.exports = {
    createTask, getAllTasks, getTask, deleteTask, updateTask, deleteTask ,patchDescription , patchCompleted
}