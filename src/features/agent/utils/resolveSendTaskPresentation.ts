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

/**
 * Leaving `?sendTask=1` should keep the socket mounted when a run is active,
 * unless the user pressed Close (S11: Close hides the floater; the run keeps going).
 */
export const resolveSendTaskKeepAliveOnUrlClose = (input: {
  readonly wasUrlOpen: boolean;
  readonly keepAlive: boolean;
  readonly isSessionActive: boolean;
  readonly closedByUser?: boolean;
}): boolean =>
  input.closedByUser !== true &&
  (input.isSessionActive ||
    shouldKeepSendTaskAliveOnNavigate({
      wasUrlOpen: input.wasUrlOpen,
      keepAlive: input.keepAlive,
    }));
