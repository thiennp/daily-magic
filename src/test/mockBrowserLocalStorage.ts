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

  vi.stubGlobal("window", { localStorage });
};
