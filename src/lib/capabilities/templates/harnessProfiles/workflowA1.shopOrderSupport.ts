import type { PresetHarnessSeed } from "@/lib/capabilities/templates/harnessProfiles/PresetHarnessSeed.type";
import { SHOP_ORDER_SUPPORT_OPERATOR_STEPS } from "@/lib/capabilities/templates/harnessProfiles/workflowA1.shopOrderSupport.operatorSteps";

export const SHOP_ORDER_SUPPORT_PRESET: PresetHarnessSeed = {
  id: "shop-order-support",
  name: "Shop order support",
  category: "Commerce",
  description:
    "Draft grounded replies to where-is-my-order and support messages using your order files and policies — send only after you approve.",
  exampleRequest:
    "Handle customer messages in inboxFocus. Read ordersFolderPath and policiesFolderPath, draft one reply per thread with tracking facts, and send only after I approve each answer.",
  operatorSteps: SHOP_ORDER_SUPPORT_OPERATOR_STEPS,
  profile: {
    ruleFocus: [
      "Ground every date and tracking number in ordersFolderPath.",
      "Follow refund and shipping rules in policiesFolderPath.",
      "Never promise refunds or delivery dates outside policy.",
      "Pause with [[AWAITING_INPUT]] per thread before marking ready to send.",
    ],
    skillSections: [
      {
        heading: "Order lookup",
        bullets: [
          "Match customer email or order ID to fulfillment status.",
          "State carrier, tracking link, and last scan when available.",
        ],
      },
      {
        heading: "Reply drafting",
        bullets: [
          "Answer the question first; empathize without admitting liability.",
          "Offer next steps: wait window, replacement, or refund per policy.",
        ],
      },
      {
        heading: "Logging",
        bullets: [
          "Summarize resolution in supportLogPath after operator sends.",
        ],
      },
    ],
    commandSteps: [
      "Load policies and recent orders from folder paths.",
      "Draft replies for each thread in inboxFocus.",
      "Present previews and wait for per-message approval.",
      "Append resolutions to supportLogPath after send.",
    ],
    instructionAddendum:
      "Sending customer email stays with the operator; the agent drafts policy-safe replies.",
    subagentMission:
      "You are the shop order support subagent. Resolve WISMO and support threads with facts from order files.",
    subagentExpertise: [
      "E-commerce customer support",
      "Order tracking interpretation",
      "Policy-safe tone",
    ],
    outputFormat:
      "Per-thread summary, draft reply, policy citation, log line for supportLogPath.",
  },
};
