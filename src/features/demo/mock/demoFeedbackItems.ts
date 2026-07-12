import type { CapabilityFeedbackInboxItem } from "@/lib/feedback/types/CapabilityFeedbackRecord.type";

import { demoTimestamp } from "./demoTimestamp.constant";

export const demoFeedbackItems: readonly CapabilityFeedbackInboxItem[] = [
  {
    id: "feedback-demo-1",
    agentRunId: "run-demo-completed",
    capabilityId: "cap-demo-assistant",
    reviewerUserId: "user-demo-jordan",
    rating: 4,
    comment:
      "The summary was helpful, but please mention open questions at the top next time.",
    status: "submitted",
    createdAt: demoTimestamp,
    updatedAt: demoTimestamp,
    capabilityName: "My assistant",
    reviewerEmail: "jordan@example.com",
    runPrompt: "Summarize the Q2 planning doc and list follow-ups.",
  },
];
