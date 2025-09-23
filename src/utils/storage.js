const memoryStorage = (() => {
  const store = new Map();
  return {
    getItem(key) {
      return store.has(key) ? store.get(key) : null;
    },
    setItem(key, value) {
      store.set(key, String(value));
    },
    removeItem(key) {
      store.delete(key);
    },
    clear() {
      store.clear();
    },
  };
})();

let cachedStorage = null;
let storageChecked = false;

function detectDefaultStorage(logger) {
  if (storageChecked && cachedStorage) {
    return cachedStorage;
  }
  storageChecked = true;
  if (typeof window === 'undefined' || !window.localStorage) {
    cachedStorage = memoryStorage;
    return cachedStorage;
  }
  try {
    const testKey = `__storage_test__${Date.now()}`;
    window.localStorage.setItem(testKey, '1');
    window.localStorage.removeItem(testKey);
    cachedStorage = window.localStorage;
  } catch (error) {
    logger?.warn?.('Local storage unavailable, falling back to in-memory storage.', error);
    cachedStorage = memoryStorage;
  }
  return cachedStorage;
}

function resolveStorage(options, logger) {
  if (options?.storage) {
    return options.storage;
  }
  return detectDefaultStorage(logger);
}

function withStorage(key, options, logger, fallbackValue, callback) {
  const storage = resolveStorage(options, logger);
  try {
    return callback(storage);
  } catch (error) {
    if (!options?.storage && storage !== memoryStorage) {
      logger?.warn?.('Local storage operation failed, switching to in-memory storage.', error);
      cachedStorage = memoryStorage;
      storageChecked = true;
      try {
        return callback(memoryStorage);
      } catch (fallbackError) {
        logger?.warn?.(`Fallback storage operation failed for key "${key}"`, fallbackError);
        return fallbackValue;
      }
    }
    logger?.warn?.(`Storage operation failed for key "${key}"`, error);
    return fallbackValue;
  }
}

export function readPersistentJSON(key, defaultValue = null, options = {}) {
  const logger = options.logger ?? console;
  const raw = withStorage(
    key,
    options,
    logger,
    null,
    (storage) => storage.getItem?.(key) ?? null,
  );
  if (raw == null) {
    return defaultValue;
  }
  try {
    return JSON.parse(raw);
  } catch (error) {
    logger?.warn?.(`Failed to parse persisted value for key "${key}"`, error);
    return defaultValue;
  }
}

export function writePersistentJSON(key, value, options = {}) {
  const logger = options.logger ?? console;
  const payload = JSON.stringify(value);
  const result = withStorage(
    key,
    options,
    logger,
    false,
    (storage) => {
      storage.setItem?.(key, payload);
      return true;
    },
  );
  return result === true;
}

export function removePersistentKey(key, options = {}) {
  const logger = options.logger ?? console;
  const result = withStorage(
    key,
    options,
    logger,
    false,
    (storage) => {
      storage.removeItem?.(key);
      return true;
    },
  );
  return result === true;
}

export function __resetStorageCacheForTests() {
  cachedStorage = null;
  storageChecked = false;
  memoryStorage.clear();
}
