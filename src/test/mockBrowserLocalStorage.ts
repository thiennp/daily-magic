import { vi } from "vitest";

export const mockBrowserLocalStorage = (): void => {
  const store = new Map<string, string>();
  const listeners = new Map<string, Set<(event: { type: string }) => void>>();

  const localStorage = {
    getItem: (key: string): string | null => store.get(key) ?? null,
    setItem: (key: string, value: string): void => {
      store.set(key, value);
    },
    removeItem: (key: string): void => {
      store.delete(key);
    },
    clear: (): void => {
      store.clear();
    },
  };

  class MockCustomEvent {
    readonly type: string;

    constructor(type: string) {
      this.type = type;
    }
  }

  vi.stubGlobal("window", {
    localStorage,
    addEventListener: (
      type: string,
      listener: (event: { type: string }) => void,
    ): void => {
      const typeListeners = listeners.get(type) ?? new Set();
      typeListeners.add(listener);
      listeners.set(type, typeListeners);
    },
    removeEventListener: (
      type: string,
      listener: (event: { type: string }) => void,
    ): void => {
      listeners.get(type)?.delete(listener);
    },
    dispatchEvent: (event: { type: string }): boolean => {
      listeners.get(event.type)?.forEach((listener) => {
        listener(event);
      });

      return true;
    },
  });
  vi.stubGlobal("CustomEvent", MockCustomEvent);
};
