import buildWorkflowTemplate from "@/lib/capabilities/templates/buildWorkflowTemplate";
import type { WorkflowCapabilityTemplate } from "@/lib/capabilities/templates/types/CapabilityTemplate.type";

export const LOCAL_BUSINESS_GOOGLE_POST_WORKFLOW: WorkflowCapabilityTemplate =
  buildWorkflowTemplate(
    "local-business-google-post",
    "Local",
    "Local business Google post",
    "Draft a Google Business Profile post for hours, offers, or events — without repeating recent posts from your history file.",
    "Prepare a Google Business post for businessName. Read postHistoryPath, avoid duplicate angles, honor hoursOrOffer, and wait for my approval before I publish.",
    [
      ["businessName", "Business name", "text"],
      ["businessType", "Business type (e.g. cafe, salon, clinic)", "text"],
      ["postTopic", "What to announce", "textarea"],
      ["hoursOrOffer", "Hours change, offer, or event dates", "textarea"],
      [
        "postHistoryPath",
        "Post history file on your Mac (JSON or markdown)",
        "text",
      ],
    ],
  );
