import buildWorkflowTemplate from "@/lib/capabilities/templates/buildWorkflowTemplate";
import type { WorkflowCapabilityTemplate } from "@/lib/capabilities/templates/types/CapabilityTemplate.type";

export const WORKFLOW_CAPABILITY_TEMPLATES_A1_FEATURED_SOCIAL: readonly WorkflowCapabilityTemplate[] =
  [
    buildWorkflowTemplate(
      "finance-sheet-qa",
      "Finance",
      "Finance sheet Q&A",
      "Analyze a finance Google Sheet open in your browser and answer questions with numbers cited from the visible workbook.",
      "Read the Google Sheet open in the browser. Answer userQuestion using only figures you can see in the sheet. Cite tab names and cell ranges. Ask one clarifying question if the data is missing or ambiguous.",
      [
        ["sheetUrl", "Google Sheet URL", "text"],
        [
          "sheetSummary",
          "What this workbook tracks (e.g. P&L, budget vs actual)",
          "textarea",
        ],
        ["userQuestion", "Your finance question", "textarea"],
        ["tabOrRange", "Tab or range to focus (optional)", "text", false],
        ["notesPath", "Q&A notes file on your Mac (optional)", "text", false],
      ],
    ),
    buildWorkflowTemplate(
      "email-inbox-reply",
      "Communication",
      "Email inbox reply",
      "Read focused inbox messages, draft grounded replies using files from a folder on your Mac, and send only after you approve each answer.",
      "Handle the inbox messages described in inboxFocus. Read knowledgeFolderPath for facts, draft one reply per message, show previews, and send only after I approve in the live terminal.",
      [
        [
          "knowledgeFolderPath",
          "Knowledge folder on your Mac (FAQs, policies, notes)",
          "text",
        ],
        [
          "inboxFocus",
          "Which messages to handle (e.g. unread, sender, subject)",
          "textarea",
        ],
        ["replyTone", "Reply tone (optional)", "text", false],
        ["signatureBlock", "Email signature (optional)", "textarea", false],
        [
          "answeredLogPath",
          "Answered log file to avoid duplicate replies (optional)",
          "text",
          false,
        ],
      ],
    ),
    buildWorkflowTemplate(
      "facebook-page-post",
      "Social",
      "Facebook Page post",
      "Draft unique Facebook Page copy, generate image or video assets, and publish after you approve — while avoiding repeats from your post history.",
      "Prepare a Facebook Page post from the workflow inputs. Load post history, avoid duplicate angles and phrasing, generate media if requested, show me a preview, and publish only after I approve in the live terminal.",
      [
        ["pageName", "Facebook Page name", "text"],
        ["topicBrief", "Topic or announcement", "textarea"],
        ["mediaType", "Media type (image, video, or text-only)", "text"],
        [
          "postHistoryPath",
          "Post history file on your Mac (JSON or markdown)",
          "text",
        ],
        ["toneAndCta", "Tone and call-to-action (optional)", "textarea", false],
      ],
    ),
  ];
