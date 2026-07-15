import type { PresetHarnessSeed } from "@/lib/capabilities/templates/harnessProfiles/PresetHarnessSeed.type";
import { EMAIL_INBOX_REPLY_OPERATOR_STEPS } from "@/lib/capabilities/templates/harnessProfiles/workflowA1.emailInboxReply.operatorSteps";

export const EMAIL_INBOX_REPLY_PRESET: PresetHarnessSeed = {
  id: "email-inbox-reply",
  name: "Email inbox reply",
  category: "Communication",
  description:
    "Read focused inbox messages, draft grounded replies using files from a folder on your Mac, and send only after you approve each answer.",
  exampleRequest:
    "Handle the inbox messages described in inboxFocus. Read knowledgeFolderPath for facts, draft one reply per message, show previews, and send only after I approve in the live terminal.",
  operatorSteps: EMAIL_INBOX_REPLY_OPERATOR_STEPS,
  profile: {
    ruleFocus: [
      "Ground every claim in knowledgeFolderPath; cite which file or section you used.",
      "If the folder does not cover a question, say so and ask one focused follow-up.",
      "Match replyTone and signatureBlock; keep replies concise and actionable.",
      "Log handled messages to answeredLogPath when provided to avoid duplicate replies.",
      "Never send email without explicit operator approval per message.",
    ],
    skillSections: [
      {
        heading: "Load knowledge",
        bullets: [
          "Scan knowledgeFolderPath recursively for markdown, text, and PDF when readable.",
          "Build a short mental index of topics: pricing, policies, support, product facts.",
          "Prefer the newest file when two sources conflict; note the conflict to the operator.",
        ],
      },
      {
        heading: "Triage inbox",
        bullets: [
          "Use inboxFocus to decide which threads to open (unread, sender, subject, or pasted IDs).",
          "Skip newsletters and auto-replies unless inboxFocus includes them.",
          "Summarize each thread in one line before drafting.",
        ],
      },
      {
        heading: "Draft replies",
        bullets: [
          "Answer the ask directly in the first sentence; use bullets for steps or options.",
          "Quote or paraphrase only what the knowledge folder supports.",
          "Include signatureBlock when set; otherwise use a neutral professional sign-off.",
        ],
      },
      {
        heading: "Send safely",
        bullets: [
          "Show To, Subject, and full reply body for each message before sending.",
          "Pause with [[AWAITING_INPUT]] until the operator approves that reply.",
          "After send, append thread id, subject, and date to answeredLogPath when set.",
        ],
      },
    ],
    commandSteps: [
      "Index knowledgeFolderPath and note gaps.",
      "List inbox threads matching inboxFocus.",
      "Skip any thread already listed in answeredLogPath.",
      "Draft grounded replies with source notes.",
      "Present previews and wait for per-message approval.",
      "Send approved replies and update answeredLogPath.",
    ],
    instructionAddendum:
      "Email is human-in-the-loop: inbox access and send approval stay with the operator on the Mac.",
    subagentMission:
      "You are the email reply subagent. Triage inbox focus, answer from local knowledge files, and coordinate approval before sending.",
    subagentExpertise: [
      "Support and sales email tone",
      "Retrieval from local reference folders",
      "Thread triage and duplicate avoidance",
    ],
    outputFormat:
      "Per message: thread summary, sources used, draft reply, approval question; then send confirmation or skip reason.",
  },
};
