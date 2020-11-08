// class to maintain queue of tasks

class Queue {
  constructor() {
    this.tasks = [];
    this.currentLength = 0;
    this.size = 4294967295; // this is memory limit for array 2^32-1
  }

  addTask(task) {
    if (this.isFull()) {
      return "Queue is Full!";
    }
    this.tasks.push(task);
    this.currentLength += 1;
  }

  removeTask() {
    if (this.currentLength === 0) {
      return "Queue is Empty";
    }
    this.tasks = this.tasks.slice(1);
    this.currentLength -= 1;
  }

  forceRemoveTask(taskId) {
    if (this.currentLength === 0) {
      return "Queue is Empty";
    }
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
    this.currentLength -= 1;
  }

  updateTaskStatus(taskId) {
    this.tasks = this.tasks.map((task) => {
      const newTask = { ...task };
      if (newTask.id === taskId) {
        newTask.isRunning = true;
      }
      return newTask;
    });
  }

  frontTask() {
    if (this.currentLength === 0) {
      return "Queue is Empty";
    }
    return this.tasks[0];
  }

  isFull() {
    if (this.currentLength === this.size) {
      return true;
    }
    return false;
  }

  getTaskList() {
    return this.tasks;
  }

  getQueueLength() {
    return this.currentLength;
  }
}

// class to maintain server

class Server {
  constructor() {
    this.serverList = [{ id: 100, currentRunningTask: null }]; // default server ID 100
    this.currentLength = 1;
    this.size = 10;
  }

  addNewServer(server) {
    if (this.isFull()) {
      return "Server List is full!";
    }
    this.serverList.push(server);
    this.currentLength += 1;
  }

  removeThisServer(id) {
    if (this.currentLength === 0) {
      return "Empty Server List!";
    }
    this.serverList = this.serverList.filter((server) => server.id !== id);
    this.currentLength -= 1;
  }

  assignTaskToServer(taskId) {
    // itr is a iterator
    for (let itr = 0; itr < this.serverList.length; itr++) {
      if (this.serverList[itr].currentRunningTask === null) {
        this.serverList[itr].currentRunningTask = taskId;
        return;
      }
    }
  }

  freeThisTaskServer(taskId) {
    this.serverList = this.serverList.map((server) => {
      const copyCurrentServer = { ...server };
      if (server.currentRunningTask === taskId) {
        copyCurrentServer.currentRunningTask = null;
      }
      return copyCurrentServer;
    });
  }

  isFull() {
    if (this.currentLength === this.size) {
      return true;
    }
    return false;
  }

  getServerList() {
    return this.serverList;
  }

  getDefaultServerId() {
    return this.serverList[0].id;
  }
}

export { Queue, Server };
