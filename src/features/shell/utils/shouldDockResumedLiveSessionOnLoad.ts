import {
  SEND_TASK_MODAL_QUERY_PARAM,
  SEND_TASK_RESUME_LIVE_SESSION_QUERY_PARAM,
  SEND_TASK_RESUME_LIVE_SESSION_QUERY_VALUE,
  SEND_TASK_SOURCE_RUN_ID_QUERY_PARAM,
} from "@/features/agent/constants/sendTaskModalQuery.constant";

/** A page load on `?sendTask=1&sourceRunId=…&resumeLive=1` is a reload of a live run. */
export const shouldDockResumedLiveSessionOnLoad = (search: string): boolean => {
  const params = new URLSearchParams(search);
  return (
    params.get(SEND_TASK_MODAL_QUERY_PARAM) === "1" &&
    params.get(SEND_TASK_RESUME_LIVE_SESSION_QUERY_PARAM) ===
      SEND_TASK_RESUME_LIVE_SESSION_QUERY_VALUE &&
    (params.get(SEND_TASK_SOURCE_RUN_ID_QUERY_PARAM) ?? "").trim().length > 0
  );
};

/**
 * bd93cdcc: reloading any open New task URL (a deep link, `?sendTask=1`)
 * while this tab's run is still live restores that run, so it docks to the
 * floater too instead of the big centered modal.
 */
export const shouldDockReloadedLiveSession = (input: {
  readonly search: string;
  readonly isReload: boolean;
  readonly hasLiveSession: boolean;
}): boolean =>
  shouldDockResumedLiveSessionOnLoad(input.search) ||
  (input.isReload &&
    input.hasLiveSession &&
    new URLSearchParams(input.search).get(SEND_TASK_MODAL_QUERY_PARAM) === "1");

export const isPageReloadNavigation = (): boolean => {
  if (typeof performance === "undefined") {
    return false;
  }
  const [entry] = performance.getEntriesByType("navigation");
  return (
    entry !== undefined &&
    "type" in entry &&
    (entry as PerformanceNavigationTiming).type === "reload"
  );
};
