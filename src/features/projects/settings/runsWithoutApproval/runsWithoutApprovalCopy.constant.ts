/**
 * S0-2 "Allow runs without approval" — Product EN, verbatim from
 * docs/design/local-cli-project-agents/COPY-S0-A-B-C.md §1.2 (`s0.unattended.*`, incl. ownerOnlyReason).
 * State lines (loading, saving, errors) are Product EN additions for this row.
 */
export const RUNS_WITHOUT_APPROVAL_COPY = {
  heading: "Coding tools",
  label: "Allow runs without approval",
  hint: "Tasks start without asking you. Folder, time and spending limits still apply.",
  confirmTitle: "Allow runs without approval?",
  confirmBody:
    "People and assistants in this project can start tasks on your computers without asking you. Limits still apply.",
  confirm: "Allow runs",
  cancel: "Cancel",
  ownerOnlyReason: "Only the project owner can change this.",
  loading: "Loading…",
  saving: "Saving…",
  loadError: "Couldn't load this setting.",
  saveError: "Couldn't save this change. Try again.",
  retry: "Try again",
} as const;
