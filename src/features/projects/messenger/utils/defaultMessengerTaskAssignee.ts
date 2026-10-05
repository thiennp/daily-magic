const WHOLE_KEY = "whole";

/** Prefill task assignee from the open bot thread; whole-project stays empty. */
export const defaultMessengerTaskAssignee = (
  threadKey: string | null,
): string => {
  if (threadKey === null || threadKey === WHOLE_KEY) return "";
  return threadKey;
};
