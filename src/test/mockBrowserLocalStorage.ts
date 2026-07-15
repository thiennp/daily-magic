import { vi } from "vitest";

export const mockBrowserLocalStorage = (): void => {
  const store = new Map<string, string>();

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
    dispatchEvent: () => true,
  });
  vi.stubGlobal("CustomEvent", MockCustomEvent);
};
