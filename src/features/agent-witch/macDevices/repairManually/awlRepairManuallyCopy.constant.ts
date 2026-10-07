import { buildAgentWitchLocalHealthCheckCommand } from "@agent-witch/shared/network";

/**
 * Repair manually panel — Product EN FINAL LOCK
 * (docs/design/awl-hard-fix/COPY.md §6). Do not edit strings without Product.
 */
export const AWL_REPAIR_MANUALLY_COPY = {
  title: "Repair manually",
  intro:
    "Run these steps in Terminal on this computer. Start at step 1 and stop once the check works.",
  restartTitle: "Restart AgentWitch Local",
  updateTitle: "Update AgentWitch Local",
  updateHelper:
    "Keeps this computer linked to your account. If it can't find the link, go to step 3.",
  reconnectTitle: "Reconnect this computer",
  reconnectHelper:
    "Only if step 2 didn't help. On Home, choose Connect this computer and run the command it shows.",
  checkTitle: "Check it works",
  checkHelper:
    'If you see a line that starts with {"ok":true, AgentWitch Local is running. Then refresh Home. Don\'t share this output, because it can include a private link code.',
  copy: "Copy",
  copied: "Copied",
} as const;

/** Step 2 — Mac owns the script; the web only shows the command. */
export const AWL_REPAIR_MANUALLY_UPDATE_COMMAND =
  "curl -fsSL https://www.agentwitch.com/install/agent-witch-update.sh | bash";

/**
 * Step 4 — static check (v1 does not poll health from the browser).
 * DF-033: reads the per-account port AWL saved (H6) instead of legacy 43347.
 */
export const AWL_REPAIR_MANUALLY_HEALTH_COMMAND =
  buildAgentWitchLocalHealthCheckCommand(".agent-witch");
