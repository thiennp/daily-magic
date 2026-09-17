export const emitHookJson = (payload: Record<string, unknown>): void => {
  process.stdout.write(`${JSON.stringify(payload)}\n`);
};

export const emitAdditionalContext = (message: string): void => {
  if (message.trim().length === 0) {
    emitHookJson({});
    return;
  }
  emitHookJson({ additional_context: message });
};

export const emitFollowupMessage = (message: string): void => {
  if (message.trim().length === 0) {
    emitHookJson({});
    return;
  }
  emitHookJson({ followup_message: message });
};
