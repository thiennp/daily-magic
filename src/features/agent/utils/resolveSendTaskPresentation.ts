export type SendTaskPresentation = "hidden" | "expanded" | "minimized";

/** Resolve Send-a-task chrome after URL / keep-alive / path changes. */
export const resolveSendTaskPresentation = (input: {
  readonly urlWantsOpen: boolean;
  readonly keepAlive: boolean;
}): SendTaskPresentation => {
  if (input.urlWantsOpen) {
    return "expanded";
  }

  if (input.keepAlive) {
    return "minimized";
  }

  return "hidden";
};

/** Navigating away from an open task should dock it, not tear it down. */
export const shouldKeepSendTaskAliveOnNavigate = (input: {
  readonly wasUrlOpen: boolean;
  readonly keepAlive: boolean;
}): boolean => input.wasUrlOpen || input.keepAlive;
