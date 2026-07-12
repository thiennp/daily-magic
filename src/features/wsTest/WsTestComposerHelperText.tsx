interface WsTestComposerHelperTextProps {
  readonly showCopyPrimary: boolean;
  readonly isSendDisabled: boolean;
  readonly isWorkflowTask: boolean;
  readonly isOffline: boolean;
}

export default function WsTestComposerHelperText({
  showCopyPrimary,
  isSendDisabled,
  isWorkflowTask,
  isOffline,
}: WsTestComposerHelperTextProps) {
  if (showCopyPrimary) {
    return (
      <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
        Your Mac is not connected. Copy for ChatGPT or Gemini, queue to send
        when online, or connect from Home → Your setup.
      </p>
    );
  }

  if (isSendDisabled && !isWorkflowTask) {
    return (
      <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
        {isOffline
          ? "Connect your Mac from Home → Your setup before sending a task."
          : "Enter a task description to continue."}
      </p>
    );
  }

  if (isSendDisabled && isWorkflowTask && isOffline) {
    return (
      <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
        Connect your Mac to send, or fill required fields and copy or queue the
        assembled prompt.
      </p>
    );
  }

  return null;
}
