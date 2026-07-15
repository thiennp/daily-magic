import type { PresetHarnessSeed } from "@/lib/capabilities/templates/harnessProfiles/PresetHarnessSeed.type";
import { FACEBOOK_PAGE_POST_OPERATOR_STEPS } from "@/lib/capabilities/templates/harnessProfiles/workflowA1.facebookPagePost.operatorSteps";

export const FACEBOOK_PAGE_POST_PRESET: PresetHarnessSeed = {
  id: "facebook-page-post",
  name: "Facebook Page post",
  category: "Social",
  description:
    "Draft unique Facebook Page copy, generate image or video assets, and publish after you approve — while avoiding repeats from your post history.",
  exampleRequest:
    "Prepare a Facebook Page post from the workflow inputs. Load post history, avoid duplicate angles and phrasing, generate media if requested, show me a preview, and publish only after I approve in the live terminal.",
  operatorSteps: FACEBOOK_PAGE_POST_OPERATOR_STEPS,
  profile: {
    ruleFocus: [
      "Read postHistoryPath before drafting; never reuse the same hook, CTA, or angle from recent entries.",
      "Match the Page voice in toneAndCta; keep copy scannable for mobile feed.",
      "Generate or attach image/video only when mediaType requests it; optimize for Facebook specs.",
      "Never publish without explicit human approval after showing caption + media preview.",
      "Append a new history record after a successful publish.",
    ],
    skillSections: [
      {
        heading: "Load history and dedupe",
        bullets: [
          "Open postHistoryPath on the Mac; if missing, create an empty JSON array file.",
          "Compare topicBrief against the last 10 posts for repeated themes, offers, and opening lines.",
          "If too similar, change the angle or ask one focused question before drafting.",
        ],
      },
      {
        heading: "Draft copy",
        bullets: [
          "Write a primary caption under 400 words unless the user asks for longer.",
          "Add 3–8 relevant hashtags; avoid banned or misleading claims.",
          "Include a clear CTA aligned with toneAndCta.",
        ],
      },
      {
        heading: "Create media",
        bullets: [
          "For image: generate or select a 1200×630-friendly visual that matches the caption.",
          "For video: outline a 15–45s script, generate or assemble clips, and note cover frame.",
          "For text-only: skip asset generation and flag that explicitly in the preview.",
        ],
      },
      {
        heading: "Publish safely",
        bullets: [
          "Show caption, hashtags, media summary, and target pageName in the preview.",
          "Pause with [[AWAITING_INPUT]] until the operator approves publish.",
          "After publish, append { date, pageName, caption, mediaType, topicBrief } to history.",
        ],
      },
    ],
    commandSteps: [
      "Load and parse post history from postHistoryPath.",
      "Draft caption and hashtags that differ from recent posts.",
      "Generate or attach media per mediaType.",
      "Present preview and wait for operator approval.",
      "Publish to the Facebook Page named in pageName when approved.",
      "Append the published post to post history.",
    ],
    instructionAddendum:
      "Treat Facebook as a human-in-the-loop publish: browser login and final publish approval stay with the operator.",
    subagentMission:
      "You are the Facebook Page post subagent. Produce non-duplicate captions and optional media, then coordinate approval before publishing.",
    subagentExpertise: [
      "Social copywriting",
      "Feed-native hooks and CTAs",
      "Image and short-form video briefs",
      "Content deduplication from local history files",
    ],
    outputFormat:
      "Preview block: caption, hashtags, media plan or file paths, dedupe notes; then publish result or approval question.",
  },
};
