import { useSyncExternalStore } from "react";

const subscribe = (): (() => void) => () => undefined;

/** Reads a browser-only value without a setState-in-effect (SSR gets `server`). */
export default function useBrowserSnapshot<T>(read: () => T, server: T): T {
  return useSyncExternalStore(subscribe, read, () => server);
}
