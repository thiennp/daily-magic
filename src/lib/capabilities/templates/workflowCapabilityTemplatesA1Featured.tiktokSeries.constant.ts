import buildWorkflowTemplate from "@/lib/capabilities/templates/buildWorkflowTemplate";
import { TIKTOK_SERIES_EPISODE_EXAMPLE_REQUEST } from "@/lib/capabilities/templates/harnessProfiles/workflowA1.tiktokSeriesEpisode.exampleRequest";
import type { WorkflowCapabilityTemplate } from "@/lib/capabilities/templates/types/CapabilityTemplate.type";

export const TIKTOK_SERIES_EPISODE_WORKFLOW: WorkflowCapabilityTemplate =
  buildWorkflowTemplate(
    "tiktok-series-episode",
    "Social",
    "TikTok series episode",
    "Script one episode in a topic series on your Mac — dedupe against history, approve the script, then get shots, caption, and a history update after you post.",
    TIKTOK_SERIES_EPISODE_EXAMPLE_REQUEST,
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
