import path from "node:path";

export interface AgentWitchLocalHealthIdentity {
  /** OS uid of the AWL process; null where uids do not exist (Windows). */
  readonly osUid: number | null;
  /** Install root folder name only (e.g. `.agent-witch`), never the full home path. */
  readonly installRootName: string;
}

/**
 * Non-secret identity for `GET /health`. Port 43347 is shared by every macOS user,
 * so clients (the Mac app) compare `osUid` with their own uid before trusting the responder.
 * Never add tokens, keys or link codes here.
 */
export const buildAgentWitchLocalHealthIdentity = (input: {
  readonly uid: number | undefined;
  readonly installDir: string;
}): AgentWitchLocalHealthIdentity => ({
  osUid:
    typeof input.uid === "number" && Number.isInteger(input.uid) && input.uid >= 0
      ? input.uid
      : null,
  installRootName: path.basename(input.installDir),
});
