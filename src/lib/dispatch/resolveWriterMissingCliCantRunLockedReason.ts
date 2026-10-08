import {
  ANTIGRAVITY_CLI_CANT_RUN_LOCKED_REASON,
  WRITER_MISSING_CLI_CANT_RUN_LOCKED_REASON,
} from "@/lib/dispatch/agentRunHonestyCopy.constant";

/** Locked Failed summary when the selected writer CLI cannot spawn (ENOENT). */
export const resolveWriterMissingCliCantRunLockedReason = (
  writerAgent: string | null | undefined,
): string =>
  writerAgent === "antigravity"
    ? ANTIGRAVITY_CLI_CANT_RUN_LOCKED_REASON
    : WRITER_MISSING_CLI_CANT_RUN_LOCKED_REASON;
