import type { CapabilityImprovementInboxItem } from "@/lib/improvements/types/CapabilityImprovementRecord.type";

import { demoTimestamp } from "./demoTimestamp.constant";

export const demoImprovementItems: readonly CapabilityImprovementInboxItem[] = [
  {
    id: "improvement-demo-1",
    feedbackId: "feedback-demo-1",
    capabilityId: "cap-demo-assistant",
    ownerUserId: "user-demo-alex",
    suggestion:
      "Add a rule to put open questions in a bullet list at the top of every summary.",
    status: "proposed",
    resultingVersionId: null,
    createdAt: demoTimestamp,
    updatedAt: demoTimestamp,
    capabilityName: "My assistant",
    feedbackComment:
      "The summary was helpful, but please mention open questions at the top next time.",
  },
];
