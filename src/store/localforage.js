import localforage from 'localforage';

localforage.config({
  driver: localforage.INDEXEDDB, // Force WebSQL; same as using setDriver()
  name: 'Todo',
  version: 1.0,
  storeName: 'tasks-indexDb', // Should be alphanumeric, with underscores.
  description: 'IndexDB storage for the app'
});


export async function addTask(newTask) {
  const { id, ...taskData } = newTask
  return localforage.setItem(id, taskData);
}

export function getAllTasks() {
  const tasks = [];
  return localforage.iterate(function (value, key, iterationNumber) {
    // Resulting key/value pair -- this callback
    // will be executed for every item in the
    // database.
    try {
      const task = {
        id: key,
        order: value.order,
        title: value.title,
        done: value.done,
        dueDate: value.dueDate,
      }
      tasks.push(task);
    } catch (error) {
      //return Promise.reject('Error accesing data')
      // throw new Error('Can\'t set task properties.')      
      console.log(`Error reading task id: ${key}, value: ${value}. Data ignored.`)
    }
  }).then(function (rez) {
    console.log('Iteration has completed', rez);
    return tasks
  }).catch(function (err) {
    // This code runs if there were any errors
    console.log(err);
  });
}

export async function setTaskDone(id, done) {
  const storedObject = await localforage.getItem(id)
  if (!storedObject) return Promise.reject('Task not found in IndexDB')

  storedObject.done = done

  return localforage.setItem(id, storedObject).then(function (value) {
    // Do other things once the value has been saved.
    console.log(value);
  }).catch(function (err) {
    console.log(err);
  });
}


export async function setAllTasks(tasks, clear){
  if (clear)
    await localforage.clear()
  console.log('Writing tasks', tasks)
  return Promise.all( tasks.map( async task => {
    const { id, ...taskData} = task
    await localforage.setItem(task.id, taskData)
  }))

}

export function deleteTask(id){
  return localforage.removeItem(id)
}

export async function setDueDateOfTask(id, localeDateLikeISOString){
   const task = await localforage.getItem(id)
   task.dueDate = localeDateLikeISOString;
   await localforage.setItem(id, task);
}