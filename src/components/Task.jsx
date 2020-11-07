import React, { useEffect } from "react";
import "./../style/task.css";

function Task(props) {
  const {
    runningTime,
    run,
    taskId,
    handleForceRemoveTask,
    handleRemoveTask,
    updateCurrentWorkingQueue,
    updateQueueAndServer,
    freeServer,
  } = props;
  const incrementPerSec = 100 / runningTime;
  const [percentage, setPercentage] = React.useState(0);
  const [time, setTime] = React.useState(0); // timer

  useEffect(() => {
    if (run) {
      const intervalId = setInterval(
        () => {
          if (percentage >= 100) {
            clearInterval(intervalId);
            handleRemoveTask();
            freeServer(taskId);
            updateQueueAndServer();
          } else {
            setPercentage(percentage + incrementPerSec);
            setTime(time + 1);
          }
        },

        1000
      );
      return () => clearInterval(intervalId);
    }
  });

  const handleDelete = (id) => {
    handleForceRemoveTask(id);
    updateCurrentWorkingQueue();
  };
  return (
    <div className="task-card">
      <span>Task Id: {taskId}</span>
      {run ? null : (
        <button onClick={() => handleDelete(taskId)}>Delete</button>
      )}
      <div className="task-bar">
        {time === 0 ? (
          <span>Waiting...</span>
        ) : (
          <span>00:{time < 10 ? `0${time}` : time}</span>
        )}
        <div
          className="task-bar-filler"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}

export default Task;
