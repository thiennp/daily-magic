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
