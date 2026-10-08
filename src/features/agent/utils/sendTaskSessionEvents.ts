/**
 * ed42d8ce: the computer list ("End session") and the dialog chrome ("Close")
 * sit outside the panel that owns the socket; they ask it through events.
 */
export const AGENT_WITCH_END_SEND_TASK_SESSION_EVENT =
  "agent-witch:end-send-task-session";

export const AGENT_WITCH_CLOSE_SEND_TASK_EVENT = "agent-witch:close-send-task";

export const requestEndSendTaskSession = (): void => {
  window.dispatchEvent(
    new CustomEvent(AGENT_WITCH_END_SEND_TASK_SESSION_EVENT),
  );
};

export const announceSendTaskClose = (): void => {
  window.dispatchEvent(new CustomEvent(AGENT_WITCH_CLOSE_SEND_TASK_EVENT));
};
