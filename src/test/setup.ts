import '@testing-library/jest-dom/vitest';

class MemoryStorage implements Storage {
  private storage = new Map<string, string>();

  get length() {
    return this.storage.size;
  }

  clear() {
    this.storage.clear();
  }

  getItem(key: string) {
    return this.storage.get(key) ?? null;
  }

  key(index: number) {
    return Array.from(this.storage.keys())[index] ?? null;
  }

  removeItem(key: string) {
    this.storage.delete(key);
  }

  setItem(key: string, value: string) {
    this.storage.set(key, value);
  }
}

const memoryStorage = new MemoryStorage();

Object.defineProperty(window, 'localStorage', {
  value: memoryStorage,
  configurable: true,
});

Object.defineProperty(globalThis, 'localStorage', {
  value: memoryStorage,
  configurable: true,
});
