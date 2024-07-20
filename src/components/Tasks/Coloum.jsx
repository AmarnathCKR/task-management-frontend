import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Task from './Task';

const Column = ({ column, tasks, toggleEdit,trigger ,setLoading}) => (
  <div className="column">
    <h2>{column.name}</h2>
    <Droppable droppableId={column._id}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps} className="task-list">
          {tasks.map((task, index) => (
            <Task setLoading={setLoading} trigger={trigger} toggleEdit={toggleEdit} key={task._id} task={task} index={index} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </div>
);

export default Column;