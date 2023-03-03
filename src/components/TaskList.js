import { Task } from "./Task"
import { TaskForm } from "./TaskForm"
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { URL } from "../App";
import loadingImg from "../assests/loader.gif";

export const TaskList = () => {

  const [tasks, setTasks] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isEditing, setEditing] = useState(false);
  const [completedTask , setCompletedTask] = useState([]);
  const [taskId, setTaskId] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    completed: false
  });

  const { name, description } = formData;
  const handleNameChange = (e) => {
    setFormData({ ...formData, name: e.target.value });
  };
  const handleDescriptionChange = (e) => {
    setFormData({ ...formData, description: e.target.value });
  };

  const getTasks = async (e) => {
    setLoading(true);
    try {
      const res = await axios.get(`${[URL]}/api/tasks`);
      setTasks(res.data);

      setLoading(false);
    } catch (e) {
      toast.error(e.message);
      setLoading(false);
      console.log(e);
    }
  }
  useEffect(() => {
    getTasks();
  }, [])

  const createTask = async (task) => {
    task.preventDefault();
    if (name === "" || description === "") return toast.error("All input field is required");

    try {
      await axios.post(`${[URL]}/api/tasks`, formData);
      toast.success("Task added successfully");
      setFormData({ ...formData, name: "", description: "" });
      getTasks();
    } catch (e) {
      toast.error(e.message);
    }
  }
 useEffect(()=>{
    const Ctask = tasks.filter(t => t.completed === true );
    setCompletedTask(Ctask);
 },[tasks])
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${[URL]}/api/tasks/${id}`);
      toast.success("Task deleted successfully");
      getTasks();
    } catch (e) {
      toast.error(e.message);
    }
  };

  const getSingleTask = async (task) => {
    setFormData({ name: task.name, completed: false, description: task.description });
    setTaskId(task._id);
    setEditing(true);
  }


  const updateTask = async (e) => {
    e.preventDefault();
    console.log(process.env);
    console.log(formData);
    if (name === '' || description === '') return toast.error("input field cannot be empty");
    try {
      await axios.put(`${URL}/api/tasks/${taskId}`, formData);
      setFormData({ name: "", description: "" })
      setEditing(false);
      toast.success("Task updated successfully");
      getTasks();
    } catch (e) {
      toast.error(e.message);
    }
  };
  const setToComplete = async (task) => {
    const newFormData = {
      name: task.name,
      completed: true,
      description: task.description
    }
    try {
      await axios.put(`${URL}/api/tasks/${task._id}`, newFormData);
      toast.success("Task completed");
      getTasks();
    } catch (error) {
      toast.error(error.message)
    }
  }
  return (
    <div>
      <h2>Task Manager</h2>
      <TaskForm name={name}
        description={description}
        handleDescriptionChange={handleDescriptionChange}
        handleNameChange={handleNameChange}
        createTask={createTask}
        isEditing={isEditing}
        updateTask={updateTask}
      />

      <div className="--flex-between --pb">
        <p><b>Total Tasks: </b>{tasks.length}</p>
        <p><b>Completed Tasks: </b>{completedTask.length}</p>
      </div>
      <hr />
      {
        isLoading && <div className="--flex-center">
          <img src={loadingImg} alt="Loading" />
        </div>
      }
      {!isLoading && tasks.length === 0 ?
        (<p>NO task added please add a task</p>) :
        (<>
          {tasks.map((task, index) => {
            return <div>
              <Task key={task._id}
                task={task}
                index={index}
                deleteTask={deleteTask}
                getSingleTask={getSingleTask}
                setToComplete={setToComplete}
              />
            </div>
          })}
        </>)}
    </div>
  )
}
