import { Queue, Server } from "./scheduler.js";

const generateId = () => {
  return Math.floor(Math.random() * 98732596749812);
};

// task scheduler utilities

const taskScheduler = new Queue();

const handleAddNTasks = function (numberOfTasks) {
  for (let itr = 0; itr < +numberOfTasks; itr++) {
    taskScheduler.addTask({ id: generateId(), isRunning: false });
  }
};

const handleRemoveTask = function () {
  taskScheduler.removeTask();
};

const getCurrentTaskList = function () {
  return taskScheduler.getTaskList();
};

const handleForceRemoveTask = function (id) {
  taskScheduler.forceRemoveTask(id);
};

// server utilities
const serverHandler = new Server();

const handleAddServer = function () {
  serverHandler.addNewServer({ id: generateId(), currentRunningTask: null });
};

const handleRemoveServer = function (id) {
  serverHandler.removeThisServer(id);
};

const getCurrentServerList = function () {
  return serverHandler.getServerList();
};

// code to maintain sync between task maintenance and server maintenance

const findIdleServer = function () {
  const serverList = getCurrentServerList();
  for (let i = 0; i < serverList.length; i++) {
    if (serverList[i].currentRunningTask === null) {
      return true;
    }
  }
  return false;
};

const findWaitingTask = function () {
  if (!findIdleServer()) {
    return null;
  }
  const queueList = getCurrentTaskList();
  for (let i = 0; i < queueList.length; i++) {
    if (queueList[i].isRunning === false) {
      return queueList[i].id;
    }
  }

  return null;
};

const assignServer = function () {
  const taskId = findWaitingTask();
  if (taskId !== null) {
    serverHandler.assignTaskToServer(taskId);
    taskScheduler.updateTaskStatus(taskId);
  }
  return taskId;
};

const freeServer = function (taskId) {
  serverHandler.freeThisTaskServer(taskId);
};

// exporting all functions and use them as per their needs

export {
  handleAddNTasks,
  handleRemoveTask,
  getCurrentTaskList,
  handleForceRemoveTask,
  handleAddServer,
  handleRemoveServer,
  getCurrentServerList,
  assignServer,
  freeServer,
};
