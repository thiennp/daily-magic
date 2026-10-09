const READ_STORAGE_KEY = "awc.notifications.read";

export const loadReadIds = (): Set<string> => {
  try {
    const raw = window.localStorage.getItem(READ_STORAGE_KEY);
    const parsed: unknown = raw === null ? [] : JSON.parse(raw);
    return new Set(Array.isArray(parsed) ? parsed.map(String) : []);
  } catch {
    return new Set();
  }
};

export const saveReadIds = (ids: ReadonlySet<string>): void => {
  try {
    window.localStorage.setItem(
      READ_STORAGE_KEY,
      JSON.stringify([...ids].slice(-500)),
    );
  } catch {
    // reading state is a per-browser convenience
  }
};
