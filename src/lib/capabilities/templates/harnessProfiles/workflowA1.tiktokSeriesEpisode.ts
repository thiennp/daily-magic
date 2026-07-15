import type { PresetHarnessSeed } from "@/lib/capabilities/templates/harnessProfiles/PresetHarnessSeed.type";
import { TIKTOK_SERIES_EPISODE_OPERATOR_STEPS } from "@/lib/capabilities/templates/harnessProfiles/workflowA1.tiktokSeriesEpisode.operatorSteps";

export const TIKTOK_SERIES_EPISODE_PRESET: PresetHarnessSeed = {
  id: "tiktok-series-episode",
  name: "TikTok series episode",
  category: "Social",
  description:
    "Plan one TikTok episode in a related-topic series: hook, script, shots, and caption — without repeating recent episode angles.",
  exampleRequest:
    "Prepare this TikTok episode for the series. Read seriesHistoryPath, avoid duplicate hooks, fit episodeAngle within seriesTopics, and deliver a film-ready script for targetLength. Wait for my approval before I treat the script as final.",
  operatorSteps: TIKTOK_SERIES_EPISODE_OPERATOR_STEPS,
  profile: {
    ruleFocus: [
      "Keep every episode aligned with seriesName and seriesTopics.",
      "Read seriesHistoryPath and do not reuse the same hook, premise, or CTA as recent entries.",
      "Hit targetLength with tight pacing; one idea per episode.",
      "Match toneStyle; default to clear, punchy, mobile-first delivery.",
      "Pause with [[AWAITING_INPUT]] for script approval before calling the episode final.",
    ],
    skillSections: [
      {
        heading: "Series continuity",
        bullets: [
          "State how this episode advances the series arc in one sentence.",
          "Cross-check episodeAngle against the last 5 history entries.",
          "Note callbacks to prior episodes only when they add clarity.",
        ],
      },
      {
        heading: "Hook and script",
        bullets: [
          "Open with a 1–2 second pattern interrupt tied to episodeAngle.",
          "Script voiceover with timestamps for targetLength (15s, 30s, or 60s).",
          "Add on-screen text cues for key numbers or steps.",
        ],
      },
      {
        heading: "Visual plan",
        bullets: [
          "Provide a shot list: framing, action, and B-roll suggestions.",
          "Flag props, screen recordings, or jump cuts needed.",
          "Keep vertical 9:16 framing in mind for every shot.",
        ],
      },
      {
        heading: "Publish pack",
        bullets: [
          "Draft caption, 3–8 hashtags, and optional pinned comment.",
          "Append episode summary to seriesHistoryPath after operator confirms publish.",
          "Suggest the next episode angle to maintain momentum.",
        ],
      },
    ],
    commandSteps: [
      "Load seriesHistoryPath and list angles to avoid.",
      "Outline hook, beats, and CTA for episodeAngle.",
      "Write timed script and on-screen text for targetLength.",
      "Add shot list and caption or hashtag pack.",
      "Present package and wait for script approval.",
      "Update seriesHistoryPath when the operator confirms publish.",
    ],
    instructionAddendum:
      "Filming and posting stay with the operator; the agent prepares series-aware content packs.",
    subagentMission:
      "You are the TikTok series episode subagent. Script one cohesive episode that fits a multi-part topic series without repeating recent hooks.",
    subagentExpertise: [
      "Short-form vertical scripting",
      "Series arcs and episode sequencing",
      "Hook and retention pacing",
    ],
    outputFormat:
      "Series fit line, hook, timed script, shot list, caption/hashtags, dedupe notes, next-episode teaser.",
  },
};
