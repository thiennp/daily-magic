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

/** Closing the modal while a Mac run is live should dock, not unmount the panel. */
export const resolveSendTaskCloseAction = (input: {
  readonly isSessionActive: boolean;
}): "minimize" | "dismiss" => (input.isSessionActive ? "minimize" : "dismiss");

/** Leaving `?sendTask=1` should keep the socket mounted when a run is active. */
export const resolveSendTaskKeepAliveOnUrlClose = (input: {
  readonly wasUrlOpen: boolean;
  readonly keepAlive: boolean;
  readonly isSessionActive: boolean;
}): boolean =>
  input.isSessionActive ||
  shouldKeepSendTaskAliveOnNavigate({
    wasUrlOpen: input.wasUrlOpen,
    keepAlive: input.keepAlive,
  });
