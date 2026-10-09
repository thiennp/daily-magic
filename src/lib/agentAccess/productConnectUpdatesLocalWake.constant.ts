import { AWC_LOCAL_WAKE_RECEIVER_CLAUSE } from "@/lib/agentAccess/awcLocalWakeReceiverCopy.constant";
import type { ProductConnectUpdateEntry } from "@/lib/agentAccess/productConnectUpdatesMeta.constant";

/** Catalog v25: agents without a Grok routine wake through a local receiver, not polling. */
export const PRODUCT_CONNECT_UPDATES_LOCAL_WAKE: readonly ProductConnectUpdateEntry[] =
  [
    {
      id: "local-wake-receiver",
      catalogVersion: 25,
      at: "2026-10-09",
      kind: "connect",
      title: "Local wake receiver (no Grok routine needed)",
      summary:
        "Cursor, Claude Code and Codex on a Mac can be woken by webhook without a Grok routine: a downloadable installer runs a local receiver behind a cloudflared tunnel, registers it with register_project_webhook and runs your wake command. Replaces timer polling of list_project_inbox.",
      adapt: AWC_LOCAL_WAKE_RECEIVER_CLAUSE,
    },
  ];
