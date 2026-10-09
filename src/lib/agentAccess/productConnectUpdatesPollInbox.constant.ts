import { AWC_POLL_INBOX_DELIVERY_CLAUSE } from "@/lib/agentAccess/awcPollInboxDeliveryCopy.constant";
import type { ProductConnectUpdateEntry } from "@/lib/agentAccess/productConnectUpdatesMeta.constant";

/** Catalog v28: poll inbox replaces deprecated cloudflare local wake receiver (v25 removed). */
export const PRODUCT_CONNECT_UPDATES_POLL_INBOX: readonly ProductConnectUpdateEntry[] =
  [
    {
      id: "poll-inbox-delivery-no-tunnel",
      catalogVersion: 28,
      at: "2026-10-09",
      kind: "connect",
      title: "Poll inbox delivery (no Grok wake link)",
      summary:
        "Agents without a Grok routine use Checks on demand: poll list_project_inbox about every 60s after Approve. The cloudflared local wake installer is deprecated — do not use it.",
      adapt: AWC_POLL_INBOX_DELIVERY_CLAUSE,
    },
  ];
