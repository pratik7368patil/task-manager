import React from "react";
import Task from "./Task";
import "./../style/taskMaintenance.css";
import {
  handleAddNTasks,
  handleRemoveTask,
  handleForceRemoveTask,
  freeServer,
} from "./../utilities/utilities.js";

export default function TaskMaintenance(props) {
  const {
    updateCurrentWorkingQueue,
    updateQueueAndServer,
    currentWorkingQueue,
  } = props;
  const [numberOfTasks, setNumberOfTasks] = React.useState(0);

  const handleSetNTasks = () => {
    if (numberOfTasks === 0 || numberOfTasks === null) {
      // update this thing to show error --> use snackbar
      console.log(
        "Number of Tasks should be greater than 0 and less than Memory Limit"
      );
      return;
    }
    handleAddNTasks(numberOfTasks);
    updateCurrentWorkingQueue();
  };

  return (
    <div className="task-maintenance-container">
      <div>
        <h4>Task maintenance</h4>
        <div>
          <input
            type="number"
            onChange={(event) => setNumberOfTasks(+event.target.value)}
          />
          <button onClick={handleSetNTasks}>Add Task</button>
        </div>
      </div>
      {currentWorkingQueue.length > 0
        ? currentWorkingQueue.map((task) => (
            <Task
              key={task.id}
              taskId={task.id}
              freeServer={freeServer}
              updateQueueAndServer={updateQueueAndServer}
              handleForceRemoveTask={handleForceRemoveTask}
              handleRemoveTask={handleRemoveTask}
              updateCurrentWorkingQueue={updateCurrentWorkingQueue}
              runningTime={20}
              run={task.isRunning}
            />
          ))
        : "No Tasks!"}
    </div>
  );
}
