const express = require('express');
const { createTask, getAllTasks , getTask, deleteTask, updateTask, patchDescription, patchCompleted} = require('../controllers/taskController');
const app = express();
// const Task = require('../models/taskModel');
const router = express.Router();

// router.route('/').get(getAllTasks).post(createTask);
// router.route('/:id').get(getTask).put(updateTask).delete(deleteTask);

router.post('/' , createTask);
router.get('/', getAllTasks );
router.get('/:id', getTask );
router.delete('/:id', deleteTask );
router.put('/:id', updateTask );
router.patch('/desc/:id' ,patchDescription);
router.patch('/comp/:id' ,patchCompleted);




module.exports = router ;