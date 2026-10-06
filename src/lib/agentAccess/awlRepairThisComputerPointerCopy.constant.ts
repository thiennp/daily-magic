/** Product's repair docs page for AgentWitch Local (COPY.md awl-hard-fix §6). Link only, no inline commands. */
export const AWL_REPAIR_THIS_COMPUTER_URL =
  "https://www.agentwitch.com/setup/repair-this-computer";

/** Locked EN pointers to the repair docs page (COPY.md awl-hard-fix §6 "Pointers (AW Invite)"). */
export const AWL_REPAIR_THIS_COMPUTER_POINTER_COPY = {
  guideline: `If AgentWitch Local won't start, is too old, or Connect fails, follow ${AWL_REPAIR_THIS_COMPUTER_URL} (restart, update, reconnect, check).`,
  installCommandTool: `If the computer stays offline or Connect says AgentWitch Local is too old, send your user to ${AWL_REPAIR_THIS_COMPUTER_URL}.`,
  invitePagePrefix: "Computer won't connect? Follow",
  invitePageLinkLabel: "Repair this computer",
  joinNextSteps: `If your user's computer won't connect AgentWitch Local, send them to ${AWL_REPAIR_THIS_COMPUTER_URL}.`,
} as const;
