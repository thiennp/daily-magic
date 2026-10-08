/**
 * Product EN, locked in `docs/design/local-cli-project-agents/COPY-S0-A-B-C.md`
 * §0, §1.4, §1.5 (do not reword). `{computer}` is filled by code.
 */
export const LOCAL_CODING_TOOL_SAFETY_COPY = {
  computerFallback: "This computer",
  folderNotAllowed:
    "Blocked: that folder isn't this project's folder on {computer}. Nothing ran.",
  folderMissing:
    "This project has no folder on {computer} yet. Set it in AgentWitch Local, then send the task again.",
  folderMissingReason: "Set this project's folder on {computer} first.",
  pauseLabel: "Pause all coding tools",
  pauseHint: "Running tasks stop. New tasks wait until you turn this off.",
  pauseStatus: "Paused",
  pauseReason: "Paused on {computer}. Turn it back on in AgentWitch Local.",
  secretHidden:
    "Output hidden: it looked like it had a secret. Open the report on {computer}.",
  /** PLACEHOLDER — not in COPY-S0-A-B-C.md; Product to supply. */
  folderCheckUnavailablePlaceholder:
    "Couldn't check this project's folder on {computer}. Nothing ran.",
  /** PLACEHOLDER — not in COPY-S0-A-B-C.md; Product to supply. */
  folderOwnedByOtherAccountPlaceholder:
    "Blocked: another AgentWitch account on {computer} uses that folder for a different project. Nothing ran.",
  /** PLACEHOLDER — not in COPY-S0-A-B-C.md; Product to supply. */
  folderLockedByOtherAccountPlaceholder:
    "Another AgentWitch account on {computer} is working in that folder right now. Nothing ran. Send the task again when it finishes.",
} as const;
