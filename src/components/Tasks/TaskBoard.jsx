import React, { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";

import { useSelector } from "react-redux";
import { getAnyApi, postAnyAuth, putAnyAuth } from "../../api/api";
import Column from "./Coloum";
import AddColumnModal from "../UI/Modals/AddColoumnModal";
import AddTaskModal from "../UI/Modals/AddTaskModal";

const TaskBoard = () => {
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [trigger, setTrigger] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [isAddColumnModalOpen, setIsAddColumnModalOpen] = useState(false);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [isTaskEdit, setIsTaskEdit] = useState(null);

  const token = useSelector((state) => state.token);

  useEffect(() => {
    const fetchColumnsAndTasks = async () => {
      try {
        setLoading(true);
        const columnsResponse = await getAnyApi("data/columns", token);
        const tasksResponse = await getAnyApi("data/tasks", token);
        setColumns(columnsResponse.data);
        setTasks(tasksResponse.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Failed to fetch columns and tasks:", error);
      }
    };

    if (token) {
      fetchColumnsAndTasks();
    }
  }, [token, trigger]);

  const handleAddColumn = (newColumn) => {
    setColumns((prev) => [...prev, newColumn]);
  };

  const handleAddTask = (newTask) => {
    setTasks((prev) => [...prev, newTask]);
  };

  const onDragEnd = async (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const task = tasks.find((task) => task._id === draggableId);
    task.column = destination.droppableId;

    try {
      setLoading(true);
      await putAnyAuth(
        `data/tasks/${task._id}`,
        { column: destination.droppableId },
        token
      );
      setTrigger(!trigger);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error updating task:", error);
    }
  };


  return (
    <div>
      {loading && (
        <>
          <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-[0.8] flex flex-col items-center justify-center">
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
            <h2 className="text-center text-white text-xl font-semibold">
              Loading...
            </h2>
            <p className="w-1/3 text-center text-white">
              This may take a few seconds, please don't close this page.
            </p>
          </div>
        </>
      )}
      <div className="button-container">
        <button onClick={() => setIsAddColumnModalOpen(true)}>
          Add Column
        </button>
        {columns.length > 0 && (
          <button onClick={() => setIsAddTaskModalOpen(true)}>Add Task</button>
        )}
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="task-board">
          {columns.map((column) => (
            <Column
            trigger={()=>setTrigger(!trigger)}
              toggleEdit={(data) => {
                setIsTaskEdit(data);
                setIsAddTaskModalOpen(true);
              }}
              setLoading={setLoading}
              key={column._id}
              column={column}
              tasks={tasks.filter((task) => task.column._id === column._id)}
            />
          ))}
        </div>
      </DragDropContext>

      <AddColumnModal
        trigger={() => setTrigger}
        isOpen={isAddColumnModalOpen}
        onClose={() => setIsAddColumnModalOpen(false)}
        onColumnAdded={handleAddColumn}
      />
      <AddTaskModal
        taskEdit={isTaskEdit}
        clearEditTask={() => setIsTaskEdit(null)}
        trigger={() => setTrigger(!trigger)}
        isOpen={isAddTaskModalOpen}
        onClose={() => setIsAddTaskModalOpen(false)}
        columns={columns}
        onTaskAdded={handleAddTask}
      />
    </div>
  );
};

export default TaskBoard;
