import {
  CLIENT_POLL_INTERVAL_HIDDEN_MS,
  CLIENT_POLL_INTERVAL_MS,
} from "@/lib/client/clientPolling.constant";

export interface SharedPolledResource<T> {
  readonly subscribe: (listener: () => void) => () => void;
  readonly getSnapshot: () => T | null;
  readonly refresh: () => Promise<T | null>;
}

export const createSharedPolledResource = <T>(input: {
  readonly fetch: () => Promise<T>;
  readonly intervalMs?: number;
  readonly hiddenIntervalMs?: number;
}): SharedPolledResource<T> => {
  const intervalMs = input.intervalMs ?? CLIENT_POLL_INTERVAL_MS;
  const hiddenIntervalMs =
    input.hiddenIntervalMs ?? CLIENT_POLL_INTERVAL_HIDDEN_MS;

  const state: {
    snapshot: T | null;
    subscriberCount: number;
    intervalId: ReturnType<typeof setInterval> | null;
    inflight: Promise<T | null> | null;
  } = {
    snapshot: null,
    subscriberCount: 0,
    intervalId: null,
    inflight: null,
  };

  const listeners = new Set<() => void>();

  const emit = (): void => {
    listeners.forEach((listener) => {
      listener();
    });
  };

  const load = async (): Promise<T | null> => {
    if (state.inflight !== null) {
      return state.inflight;
    }

    state.inflight = (async () => {
      try {
        state.snapshot = await input.fetch();
        emit();
        return state.snapshot;
      } catch {
        return state.snapshot;
      } finally {
        state.inflight = null;
      }
    })();

    return state.inflight;
  };

  const resolveIntervalMs = (): number => {
    if (typeof document === "undefined") {
      return intervalMs;
    }

    return document.hidden ? hiddenIntervalMs : intervalMs;
  };

  const schedule = (): void => {
    if (state.intervalId !== null) {
      clearInterval(state.intervalId);
    }

    state.intervalId = setInterval(() => {
      void load();
    }, resolveIntervalMs());
  };

  const start = (): void => {
    void load();
    schedule();

    if (typeof document !== "undefined") {
      document.addEventListener("visibilitychange", schedule);
    }
  };

  const stop = (): void => {
    if (state.intervalId !== null) {
      clearInterval(state.intervalId);
      state.intervalId = null;
    }

    if (typeof document !== "undefined") {
      document.removeEventListener("visibilitychange", schedule);
    }
  };

  const subscribe = (listener: () => void): (() => void) => {
    listeners.add(listener);
    state.subscriberCount += 1;

    if (state.subscriberCount === 1) {
      start();
    }

    return () => {
      listeners.delete(listener);
      state.subscriberCount -= 1;

      if (state.subscriberCount === 0) {
        stop();
      }
    };
  };

  return {
    subscribe,
    getSnapshot: () => state.snapshot,
    refresh: load,
  };
};
