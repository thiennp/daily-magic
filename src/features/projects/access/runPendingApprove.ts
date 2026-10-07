import { formatPendingNicknameTaken } from "@/features/projects/access/approvalCard/pendingNickname";
import { AWC_PROJECT_ACCESS_COPY } from "@/features/projects/access/awcProjectAccessCopy.constant";
import { mapProjectAccessError } from "@/lib/projects/acl/mapProjectAccessError";
import { PROJECT_ACCESS_ERROR_MESSAGES } from "@/lib/projects/acl/projectAccessErrorMessages.constant";

/** Raw code, public code, or the already-mapped copy the approve route returns. */
export const isDisplayNameTakenError = (raw: string | undefined): boolean =>
  raw === "display_name_taken" ||
  raw === "DISPLAY_NAME_TAKEN" ||
  (raw !== undefined && raw === PROJECT_ACCESS_ERROR_MESSAGES.display_name_taken);

/**
 * Client-side Approve handler for one pending card. On a taken nickname it
 * keeps the owner's name and shows the inline error — it never swaps in
 * another name (DF-017).
 */
export const runPendingApprove = async (input: {
  readonly requestId: string;
  readonly needsName: boolean;
  readonly nameValue: string;
  readonly onApprove: (
    requestId: string,
    projectDisplayName?: string,
  ) => Promise<{ readonly ok: boolean; readonly errorMessage?: string }>;
  readonly setError: (message: string | null) => void;
}): Promise<boolean> => {
  const copy = AWC_PROJECT_ACCESS_COPY;
  if (input.needsName && !input.nameValue.trim()) {
    input.setError(copy.displayNameRequired);
    return false;
  }
  const result = await input.onApprove(
    input.requestId,
    input.needsName ? input.nameValue : undefined,
  );
  if (!result.ok) {
    const raw = result.errorMessage;
    input.setError(
      isDisplayNameTakenError(raw)
        ? formatPendingNicknameTaken(input.nameValue)
        : mapProjectAccessError(raw, "Failed."),
    );
    return false;
  }
  input.setError(null);
  return true;
};
