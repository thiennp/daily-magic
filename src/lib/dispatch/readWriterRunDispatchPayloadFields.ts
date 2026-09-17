export const readWriterRunDispatchPayloadFields = (
  payload: Readonly<Record<string, unknown>>,
): {
  readonly sessionContinuation: boolean;
  readonly sourceRunId?: string;
  readonly projectFolderPath?: string;
  readonly projectId?: string;
} => ({
  sessionContinuation: payload.sessionContinuation === true,
  sourceRunId:
    typeof payload.sourceRunId === "string" ? payload.sourceRunId : undefined,
  projectFolderPath:
    typeof payload.projectFolderPath === "string"
      ? payload.projectFolderPath
      : undefined,
  projectId:
    typeof payload.projectId === "string" ? payload.projectId : undefined,
});
