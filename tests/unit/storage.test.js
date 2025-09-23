import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  __resetStorageCacheForTests,
  readPersistentJSON,
  writePersistentJSON,
} from '../../src/utils/storage.js';

describe('storage utils', () => {
  beforeEach(() => {
    __resetStorageCacheForTests();
    const storage = globalThis.localStorage;
    if (storage && typeof storage.clear === 'function') {
      storage.clear();
    }
  });

  it('returns default value when nothing is stored', () => {
    const fallback = { foo: 'bar' };
    const result = readPersistentJSON('missing-key', fallback);
    expect(result).toEqual(fallback);
  });

  it('persists and reads JSON payloads via available storage', () => {
    const key = 'course-apply';
    const payload = { name: 'Тест', email: 'user@example.com', agree: true };
    expect(writePersistentJSON(key, payload)).toBe(true);
    const restored = readPersistentJSON(key, {});
    expect(restored).toEqual(payload);
  });

  it('falls back to memory storage when localStorage throws', () => {
    const storage = globalThis.localStorage;
    const setSpy = vi.spyOn(storage, 'setItem').mockImplementation(() => {
      throw new Error('quota exceeded');
    });
    const getSpy = vi.spyOn(storage, 'getItem').mockImplementation(() => {
      throw new Error('quota exceeded');
    });
    const removeSpy = vi.spyOn(storage, 'removeItem').mockImplementation(() => {
      throw new Error('quota exceeded');
    });
    __resetStorageCacheForTests();
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const key = 'fallback-case';
    const payload = { ok: true };

    try {
      expect(writePersistentJSON(key, payload)).toBe(true);
      expect(readPersistentJSON(key, null)).toEqual(payload);
    } finally {
      warnSpy.mockRestore();
      setSpy.mockRestore();
      getSpy.mockRestore();
      removeSpy.mockRestore();
      __resetStorageCacheForTests();
    }
  });
});
