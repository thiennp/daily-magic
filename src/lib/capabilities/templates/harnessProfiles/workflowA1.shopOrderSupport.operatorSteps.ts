import type OperatorStepDefinition from "@/lib/workflows/types/OperatorStepDefinition.type";

export const SHOP_ORDER_SUPPORT_OPERATOR_STEPS: readonly OperatorStepDefinition[] =
  [
    {
      id: "shop-order-support-operator-inbox",
      title: "Open customer messages and order records",
      content: [
        "1. Open the support inbox described in inboxFocus.",
        "2. Cross-check ordersFolderPath for tracking and fulfillment status.",
        "3. Reply ready when the messages to answer are visible.",
      ].join("\n"),
    },
    {
      id: "shop-order-support-operator-approve",
      title: "Approve each customer reply",
      content: [
        "1. Review drafts for tone, refund policy, and factual order details.",
        "2. Reject promises the shop cannot keep (shipping dates, refunds).",
        "3. Reply approve per message before the agent marks it ready to send.",
      ].join("\n"),
    },
    {
      id: "shop-order-support-operator-send",
      title: "Send replies from your shop tools",
      content: [
        "1. Paste approved replies into Shopify, Etsy, email, or your helpdesk.",
        "2. The agent does not send customer email on your behalf.",
        "3. Ask the agent to append resolved threads to supportLogPath.",
      ].join("\n"),
    },
  ];
