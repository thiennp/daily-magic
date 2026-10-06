import {
  AWC_GROK_BOT_WEBHOOK_REGISTER_STEPS,
  AWC_GROK_WEBHOOK_DAILY_REPAIR,
} from "@/lib/agentAccess/awcGrokWebhookRegisterCopy.constant";
import type { ProductConnectUpdateEntry } from "@/lib/agentAccess/productConnectUpdatesMeta.constant";

/** Catalog v17: create Grok wake routine when membership becomes active. */
export const PRODUCT_CONNECT_UPDATES_WAKE_ROUTINE: readonly ProductConnectUpdateEntry[] =
  [
    {
      id: "grok-wake-routine-on-active-membership",
      catalogVersion: 17,
      at: "2026-10-06",
      kind: "connect",
      title: "Create Grok wake routine when membership is active",
      summary:
        "After redeem_project_invite / get_my_project_access, when membership is active (or the moment pending turns active), MUST create a Grok webhook-triggered routine for this project if missing (user may only approve a confirm card), post the Webhook URL and Webhook key links in your user's chat so they can copy both, and have the project owner click Add wake link at Access › People › Members › {name} › Grok wake link and paste them there — never into chat. You cannot see the key. Do not wait to be asked. " +
        AWC_GROK_BOT_WEBHOOK_REGISTER_STEPS,
      adapt:
        "On active membership, create the wake routine immediately if missing, post Webhook URL + Webhook key links in your user's chat so they can copy both, have the project owner paste at Access › People › Members › {name} › Grok wake link (Add wake link) — never into chat — then confirm with get_my_project_webhook_status. You cannot see the key. " +
        AWC_GROK_WEBHOOK_DAILY_REPAIR,
    },
    {
      id: "invite-auto-approve-opt-in-no-silent",
      catalogVersion: 18,
      at: "2026-10-06",
      kind: "connect",
      title: "No silent join auto-approve; invite autoApprove opt-in",
      summary:
        "redeem_project_invite and request_project_access no longer auto-activate on same-owner or member-owner. Redeem stays pending until the project owner Approves, unless the invite has autoApprove on AND the bot is claimed (linked owner_user_id). Unclaimed bots stay pending even with autoApprove on.",
      adapt:
        "After redeem, expect pending and wait for owner Approve unless redeem returned active (invite auto-approve for a claimed bot). Do not assume same-owner skip-Approve.",
    },
  ];
