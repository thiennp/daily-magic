import type OperatorStepDefinition from "@/lib/workflows/types/OperatorStepDefinition.type";

export const TIKTOK_SERIES_EPISODE_OPERATOR_STEPS: readonly OperatorStepDefinition[] =
  [
    {
      id: "tiktok-series-episode-operator-brief",
      title: "Confirm the series brief and past episodes",
      content: [
        "1. Read seriesName and seriesTopics so this episode fits the arc.",
        "2. Open seriesHistoryPath on your Mac if set and skim recent hooks and angles.",
        "3. Reply ready when episodeAngle and targetLength are final enough to script.",
      ].join("\n"),
    },
    {
      id: "tiktok-series-episode-operator-approve-script",
      title: "Approve the script before filming",
      content: [
        "1. Review hook, beats, on-screen text, and voiceover for the target length.",
        "2. Reject or edit anything that repeats a recent episode hook too closely.",
        "3. Reply approve when you are ready to film with this script.",
      ].join("\n"),
    },
    {
      id: "tiktok-series-episode-operator-publish",
      title: "Film and publish on your side",
      content: [
        "1. Record using the shot list; the agent does not operate the camera.",
        "2. Paste caption and hashtags from the deliverable into TikTok when you post.",
        "3. Ask the agent to append this episode to seriesHistoryPath after you publish.",
      ].join("\n"),
    },
  ];
