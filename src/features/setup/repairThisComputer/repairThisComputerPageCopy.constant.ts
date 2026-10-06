/** Product EN for /setup/repair-this-computer (COPY.md §6 + AW Mac truth). */
export const REPAIR_THIS_COMPUTER_PAGE_COPY = {
  eyebrow: "This computer",
  title: "Repair AgentWitch Local on this computer",
  intro:
    "When Connect fails, AgentWitch Local does not answer, or this computer is too old for this site, follow these steps in order. Stop when the check succeeds.",
  updateHeading: "Update",
  updateIntro:
    "Get a current AgentWitch Local. Prefer the menu bar app on Apple Silicon, or run the update command that keeps this computer linked.",
  updateDownloadLinkLabel: "Download AgentWitch Local",
  updateUnixLabel: "macOS or Linux — paste into Terminal",
  updateWindowsLabel:
    "Windows — paste into PowerShell or Command Prompt (needs a default WSL distro with systemd)",
  updateKeepsLink:
    "This keeps this computer linked. If nothing is linked yet, the command stops and tells you to use Connect this computer on Home.",
  restartHeading: "Restart",
  restartIntro:
    "Restart AgentWitch Local on this computer, then wait a few seconds.",
  reconnectHeading: "Reconnect",
  reconnectBody:
    "Only if Update and Restart did not help. On Home, choose Connect this computer and run the command it shows.",
  checkHeading: "Check it works",
  checkIntro: "Ask AgentWitch Local for a health reply:",
  checkOkHint:
    'If you see a line that starts with {"ok":true, AgentWitch Local is running. If it says "wsConnected":false, it is running but not connected yet; try Reconnect. Do not share this output, because it can include a private link code.',
  checkAfter:
    "Then refresh Home and confirm this computer looks ready.",
} as const;
