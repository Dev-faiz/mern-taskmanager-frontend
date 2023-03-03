import { useState } from 'react';
import { FaEdit, FaCheckDouble, FaTrash } from 'react-icons/fa'
export const Task = ({ task , index, deleteTask, getSingleTask ,setToComplete }) => {
  const [showDescription, setDescription] = useState(false);
  return (
    <div className="taskBody" onClick={() => { setDescription(!showDescription) }}>
      <div className={task.completed ? 'task completed' : 'task'}>
        <p>
          <b>{index + 1 + ". "}</b>
          {task.name}
        </p>
        <div className="task-icons">
          <FaCheckDouble color='green' onClick={()=> setToComplete(task)} />
          <FaEdit color='purple' onClick={() => { getSingleTask(task) }} />
          <FaTrash color='red' onClick={() => { deleteTask(task._id); }} />
        </div>
      </div>
      <div>
         {showDescription && <h4>{task.description}</h4>}
      </div>
    </div>
  )
}
