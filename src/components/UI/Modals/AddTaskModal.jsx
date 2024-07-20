import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import { postAnyAuth, putAnyAuth } from "../../../api/api";
import { useSelector } from "react-redux";

const AddTaskModal = ({
  isOpen,
  onClose,
  columns,
  onTaskAdded,
  trigger,
  taskEdit,
  clearEditTask,
}) => {
 
  const [newTask, setNewTask] = useState({
    title: taskEdit ? taskEdit.title : "",
    description: taskEdit ? taskEdit.description : "",
    columnId: taskEdit ? taskEdit.columnId : "",
    dueDate: taskEdit ? taskEdit.dueDate : "",
  });

  useEffect(() => {
    setNewTask({
      title: taskEdit ? taskEdit.title : "",
      description: taskEdit ? taskEdit.description : "",
      columnId: taskEdit ? taskEdit.column._id : "",
      dueDate: taskEdit ? taskEdit.dueDate.slice(0,10) : "",
    });
  }, [taskEdit]);

  const token = useSelector((state) => state.token);

  useEffect(() => {
    if (!isOpen) {
      setNewTask({ title: "", description: "", columnId: "", dueDate: "" });
    }
  }, [isOpen]);

  const handleAddTask = async () => {
    try {
      const { title, description, columnId, dueDate } = newTask;
      if (!taskEdit) {
        const task = await postAnyAuth(
          "data/tasks",
          {
            title,
            description,
            columnId,
            dueDate,
          },
          token
        );
        onTaskAdded(task.data);
        trigger();
        onClose();
      } else {
        const task = await putAnyAuth(
          `data/tasks/${taskEdit._id}`,
          {
            title,
            description,
            column : columnId,
            dueDate,
          },
          token
        );
        clearEditTask();
        trigger();
        onClose()
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleColumnChange = (e) => {
    const { value } = e.target;
    setNewTask((prev) => ({ ...prev, columnId: value }));
  };



  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="add-task-container flex flex-col justify-center p-4">
        <h2 className="text-2xl font-bold mb-4">{taskEdit? "Edit task": "Add New Task"}</h2>
        <input
          type="text"
          name="title"
          value={newTask.title}
          onChange={handleInputChange}
          placeholder="Task Title"
          className="w-full p-2 pl-10 text-sm text-gray-700"
        />
        <textarea
          name="description"
          value={newTask.description}
          onChange={handleInputChange}
          placeholder="Task Description"
          className="w-full p-2 pl-10 text-sm text-gray-700 h-32"
        />
        <input
          type="date"
          name="dueDate"
          value={newTask.dueDate}
          onChange={handleInputChange}
          placeholder="Due Date"
          className="w-full p-2 pl-10 text-sm text-gray-700"
        />
        <select
          name="columnId"
          value={newTask.columnId}
          onChange={handleColumnChange}
          className="w-full p-2 pl-10 text-sm text-gray-700"
        >
          <option value="">Select Column</option>
          {columns.map((column) => (
            <option key={column._id} value={column._id}>
              {column.name}
            </option>
          ))}
        </select>
        <button
          onClick={handleAddTask}
          className="bg-orange-500 hover:bg-orange-700 text-white font-boldpy-2 px-4 rounded"
        >
         {taskEdit ? "Edit Task" : "Add Task"} 
        </button>
      </div>
    </Modal>
  );
};

export default AddTaskModal;
