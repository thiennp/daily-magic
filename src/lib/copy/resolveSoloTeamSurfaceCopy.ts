export interface SoloTeamCopyInput {
  readonly teamNavEnabled: boolean;
}

export const resolveLibraryPageSubtitle = (input: SoloTeamCopyInput): string =>
  input.teamNavEnabled
    ? "Shared workflows your team can run — multi-user ownership."
    : "Your saved workflows — for you alone. Then run them on your Mac.";

export const resolveLibrarySignedInEmptyBody = (
  input: SoloTeamCopyInput,
): string =>
  input.teamNavEnabled
    ? "Save or share workflows your team can run. Ownership is shared."
    : "Save one from Marketplace or turn a New task into a saved workflow. Only you see and run these.";

export const resolveReportsPageSubtitle = (input: SoloTeamCopyInput): string =>
  input.teamNavEnabled
    ? "Jobs across shared runners — status, named approvals, and results."
    : "History of jobs you sent to your Mac — status, approvals, and results.";

export const resolveReportsSignedInEmptyBody = (
  input: SoloTeamCopyInput,
): string =>
  input.teamNavEnabled
    ? "Team jobs and named approvals land here."
    : "Send a task to your Mac — finished jobs and approvals will land here.";

export const resolveComposerApprovalHelper = (
  input: SoloTeamCopyInput,
): string =>
  input.teamNavEnabled
    ? "A named approver must approve sensitive jobs before they run."
    : "You'll be asked to approve when the job needs it.";

export interface ComposerApprovalWaitingLabelInput extends SoloTeamCopyInput {
  readonly approverName?: string | null;
}

/** COPY-P1 — waiting chip/text while a job is pending dispatch approval. */
export const resolveComposerApprovalWaitingLabel = (
  input: ComposerApprovalWaitingLabelInput,
): string => {
  if (input.teamNavEnabled) {
    const name = (input.approverName ?? "").trim();
    return name.length > 0 ? `Waiting on ${name}` : "Waiting on approver";
  }
  return "Approval needed — you";
};
