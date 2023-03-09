import localforage from 'localforage';

localforage.config({
  driver      : localforage.INDEXEDDB, // Force WebSQL; same as using setDriver()
  name        : 'Todo',
  version     : 1.0,
  storeName   : 'my-indexDb', // Should be alphanumeric, with underscores.
  description : 'IndexDB storage for the app'
});


export async function addTask(newTask) {
  const {id, ...taskData} = newTask
  return localforage.setItem(id, taskData);
}

