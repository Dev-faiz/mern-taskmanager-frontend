
export const TaskForm = ({createTask , name , updateTask , isEditing, description , handleDescriptionChange , handleNameChange}) => {
  return (
    <form className="task-form" onSubmit={isEditing ? updateTask : createTask }>
        <div>
            <input type="text" name="name" placeholder="Add a task" value={name} onChange={handleNameChange} />
            <input type="text" name="description" placeholder="Add a description" value={description} onChange={handleDescriptionChange} />
        </div>
       <div>

        <button type="submit"  >{isEditing ? "Edit" : "Add"}</button>
       </div>
    </form>
  )
}
