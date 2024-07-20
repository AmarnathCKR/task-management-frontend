import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { deleteAnyAuth } from "../../api/api";
import { useSelector } from "react-redux";

const Task = ({ task, index, toggleEdit, trigger, setLoading }) => {
  const dueDate = new Date(task.dueDate);
  const isDueDateClose = dueDate.getTime() - new Date().getTime() < 86400000; // 1 day in milliseconds
  const isDueDatePassed = dueDate.getTime() < new Date().getTime();
  const isDueDateToday =
    dueDate.toLocaleDateString() === new Date().toLocaleDateString();

  let dueDateStatus;
  if (isDueDatePassed) {
    dueDateStatus = (
      <span style={{ textDecoration: "line-through", color: "gray" }}>
        Completed
      </span>
    );
  } else if (isDueDateToday) {
    dueDateStatus = <span style={{ color: "orange" }}>Today!</span>;
  } else if (isDueDateClose) {
    dueDateStatus = <span style={{ color: "red" }}>(Due soon!)</span>;
  } else {
    dueDateStatus = <span>{dueDate.toLocaleString()}</span>;
  }

  const token = useSelector((state) => state.token);

  const handleDelete = () => {
    setLoading(true);
    deleteAnyAuth(`data/tasks/${task._id}`, token)
      .then((res) => {
        setLoading(false);
        trigger();
      })
      .catch((err) => setLoading(false));
  };

  return (
    <Draggable draggableId={task._id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="task"
        >
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>Created at: {new Date(task.createdAt).toLocaleString()}</p>
          <p>Due Date: {dueDateStatus}</p>
          <div className="task-actions">
            <button onClick={() => toggleEdit(task)}>Edit</button>
            <button className="bg-red-600" onClick={handleDelete}>Delete</button>
            
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Task;
