import buildWorkflowTemplate from "@/lib/capabilities/templates/buildWorkflowTemplate";
import type { WorkflowCapabilityTemplate } from "@/lib/capabilities/templates/types/CapabilityTemplate.type";

export const SHOP_ORDER_SUPPORT_WORKFLOW: WorkflowCapabilityTemplate =
  buildWorkflowTemplate(
    "shop-order-support",
    "Commerce",
    "Shop order support",
    "Draft grounded replies to where-is-my-order and support messages using your order files and policies — send only after you approve.",
    "Handle customer messages in inboxFocus. Read ordersFolderPath and policiesFolderPath, draft one reply per thread with tracking facts, and send only after I approve each answer.",
    [
      ["shopName", "Shop name", "text"],
      [
        "inboxFocus",
        "Which messages to handle (unread, WISMO, refund, etc.)",
        "textarea",
      ],
      [
        "ordersFolderPath",
        "Orders folder on your Mac (exports, CSV, notes)",
        "text",
      ],
      [
        "policiesFolderPath",
        "Policies folder on your Mac (shipping, refunds)",
        "text",
      ],
      ["replyTone", "Reply tone (optional)", "text", false],
      [
        "supportLogPath",
        "Support log file on your Mac (optional)",
        "text",
        false,
      ],
    ],
  );
