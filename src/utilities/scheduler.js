// class to maintain queue of tasks

class Queue {
  constructor() {
    this.tasks = [];
    this.currentEmptySlot = 0;
    this.size = 4294967295; // this is memory limit for array 2^32-1
  }

  addTask(task) {
    if (this.isFull()) {
      return "Queue is Full!";
    }
    this.tasks.push(task);
    this.currentEmptySlot += 1;
  }

  removeTask() {
    if (this.currentEmptySlot === 0) {
      return "Queue is Empty";
    }
    this.tasks = this.tasks.slice(1);
    this.currentEmptySlot -= 1;
  }

  forceRemoveTask(id) {
    if (this.currentEmptySlot === 0) {
      return "Queue is Empty";
    }
    this.tasks = this.tasks.filter((task) => task.id !== id);
    this.currentEmptySlot -= 1;
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
    if (this.currentEmptySlot === 0) {
      return "Queue is Empty";
    }
    return this.tasks[0];
  }

  isFull() {
    if (this.currentEmptySlot === 4294967295) {
      return true;
    }
    return false;
  }

  getTaskList() {
    return this.tasks;
  }

  getQueueLength() {
    return this.currentEmptySlot;
  }
}

// class to maintain server

class Server {
  constructor() {
    this.serverList = [{ id: 100, currentRunningTask: null }]; // default server ID 100
    this.currentEmptySlot = 1;
    this.size = 10;
  }

  addNewServer(server) {
    if (this.isFull()) {
      return "Server List is full!";
    }
    this.serverList.push(server);
    this.currentEmptySlot += 1;
  }

  removeThisServer(id) {
    if (this.currentEmptySlot === 0) {
      return "Empty Server List!";
    }
    this.serverList = this.serverList.filter((server) => server.id !== id);
    this.currentEmptySlot -= 1;
  }

  assignTaskToServer(taskId) {
    for (let i = 0; i < this.serverList.length; i++) {
      if (this.serverList[i].currentRunningTask === null) {
        this.serverList[i].currentRunningTask = taskId;
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
    if (this.currentEmptySlot === this.size) {
      return true;
    }
    return false;
  }

  getServerList() {
    return this.serverList;
  }
}

export { Queue, Server };
