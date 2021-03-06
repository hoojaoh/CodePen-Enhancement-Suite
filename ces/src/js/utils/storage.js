export class Storage {
  constructor(area) {
    this.store = chrome.storage[area];
  }

  // TODO: stop throwing on key not found
  // once any code depending on it is cleaned up
  get(key = null, strict = true) {
    return new Promise((resolve, reject) => {
      this.store.get(key, response => {
        if (key === null) {
          resolve(response);
        } else if (response.hasOwnProperty(key)) {
          resolve(response[key]);
        } else {
          if (strict) {
            reject(new Error());
          } else {
            resolve(undefined);
          }
        }
      });
    });
  }

  set(key, data) {
    return new Promise(resolve => {
      let storageObject = {};

      if (typeof key === 'string') {
        storageObject[key] = data;
      } else if (typeof key === 'object') {
        storageObject = key;
      }

      this.store.set(storageObject, resolve);
    });
  }
}

export default new Storage('sync');
