import { Queue, Server } from "./scheduler.js";

const generateId = () => {
  return Math.floor(Math.random() * 98732596749812);
};

// task scheduler utilities

const taskScheduler = new Queue();

const handleAddNTasks = function (numberOfTasks) {
  for (let itr = 0; itr < +numberOfTasks; itr++) {
    // itr is a iterator
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

const DEFAULT_SERVER_CODE = serverHandler.getDefaultServerId();

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
  for (let itr = 0; itr < serverList.length; itr++) {
    if (serverList[itr].currentRunningTask === null) {
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
  for (let itr = 0; itr < queueList.length; itr++) {
    if (queueList[itr].isRunning === false) {
      return queueList[itr].id;
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
  DEFAULT_SERVER_CODE,
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
