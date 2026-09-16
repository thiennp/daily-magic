export const readWriterRunDispatchPayloadFields = (
  payload: Readonly<Record<string, unknown>>,
): {
  readonly sessionContinuation: boolean;
  readonly sourceRunId?: string;
  readonly projectFolderPath?: string;
} => ({
  sessionContinuation: payload.sessionContinuation === true,
  sourceRunId:
    typeof payload.sourceRunId === "string" ? payload.sourceRunId : undefined,
  projectFolderPath:
    typeof payload.projectFolderPath === "string"
      ? payload.projectFolderPath
      : undefined,
});
