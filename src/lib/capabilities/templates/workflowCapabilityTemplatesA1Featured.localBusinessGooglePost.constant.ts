import buildWorkflowTemplate from "@/lib/capabilities/templates/buildWorkflowTemplate";
import { LOCAL_BUSINESS_GOOGLE_POST_EXAMPLE_REQUEST } from "@/lib/capabilities/templates/harnessProfiles/workflowA1.localBusinessGooglePost.exampleRequest";
import type { WorkflowCapabilityTemplate } from "@/lib/capabilities/templates/types/CapabilityTemplate.type";

export const LOCAL_BUSINESS_GOOGLE_POST_WORKFLOW: WorkflowCapabilityTemplate =
  buildWorkflowTemplate(
    "local-business-google-post",
    "Local",
    "Local business Google post",
    "Draft a Google Business Profile post for hours, offers, or events — dedupe against your Mac history file, approve copy, then you publish.",
    LOCAL_BUSINESS_GOOGLE_POST_EXAMPLE_REQUEST,
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
