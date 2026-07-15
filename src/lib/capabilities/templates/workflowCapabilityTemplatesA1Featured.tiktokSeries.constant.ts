import buildWorkflowTemplate from "@/lib/capabilities/templates/buildWorkflowTemplate";
import type { WorkflowCapabilityTemplate } from "@/lib/capabilities/templates/types/CapabilityTemplate.type";

export const TIKTOK_SERIES_EPISODE_WORKFLOW: WorkflowCapabilityTemplate =
  buildWorkflowTemplate(
    "tiktok-series-episode",
    "Social",
    "TikTok series episode",
    "Plan one TikTok episode in a related-topic series: hook, script, shots, and caption — without repeating recent episode angles.",
    "Prepare this TikTok episode for the series. Read seriesHistoryPath, avoid duplicate hooks, fit episodeAngle within seriesTopics, and deliver a film-ready script for targetLength. Wait for my approval before I treat the script as final.",
    [
      ["seriesName", "Series name", "text"],
      ["seriesTopics", "Related topics this series covers", "textarea"],
      ["episodeAngle", "This episode's angle", "textarea"],
      ["episodeNumber", "Episode number (optional)", "text", false],
      ["targetLength", "Target length (15s, 30s, or 60s)", "text"],
      ["toneStyle", "Tone or style (optional)", "text", false],
      [
        "seriesHistoryPath",
        "Series history file on your Mac (JSON or markdown)",
        "text",
      ],
    ],
  );
