const STATE_KEY_PREFIX = '@@scroll|';

let storage;

try {
  if (typeof window === "undefined" || !window.sessionStorage) {
    throw "no sessionStorage";
  }
  storage = window.sessionStorage;
}
catch (e) {
  storage = {
    getItem: () => null,
    setItem: () => null,
    removeItem: () => null
  };
}

const readState = (key) => {
  try {
    return storage.getItem(key);
  } catch (e) {
    return null;
  }
  return null;
}

const saveState = (key, value) => {
  try {
    storage.setItem(key, value);
  } catch (e) {
  }
}

export default class StateStorage {
  constructor(router) {
    this.getFallbackLocationKey = router.createPath;
  }

  read(location, key) {
    return readState(this.getStateKey(location, key));
  }

  save(location, key, value) {
    saveState(this.getStateKey(location, key), value);
  }

  getStateKey(location, key) {
    const locationKey = location.key || this.getFallbackLocationKey(location);
    const stateKeyBase = `${STATE_KEY_PREFIX}${locationKey}`;
    return key == null ? stateKeyBase : `${stateKeyBase}|${key}`;
  }
}
