let tasks = [];
let idCounter = 1;

function getAll() {
  return tasks;
}

function create(title) {
  const task = { id: idCounter++, title };
  tasks.push(task);
  return task;
}

function remove(id) {
  const index = tasks.findIndex(t => t.id == id);
  if (index === -1) return false;
  tasks.splice(index, 1);
  return true;
}

function reset() {
  tasks = [];
  idCounter = 1;
}

module.exports = {
  getAll,
  create,
  remove,
  reset
};
