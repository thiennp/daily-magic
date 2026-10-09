"use client";

import AwcOneWindowInFeedApprovals from "@/features/projects/messenger/oneWindow/AwcOneWindowInFeedApprovals";
import AwcOneWindowInFeedRunApprovals from "@/features/projects/messenger/oneWindow/AwcOneWindowInFeedRunApprovals";
import AwcOneWindowInFeedSkillQuestions from "@/features/projects/messenger/oneWindow/AwcOneWindowInFeedSkillQuestions";

interface AwcOneWindowInFeedCardsProps {
  readonly projectId: string;
  readonly enabled: boolean;
}

/** Owner decision cards above the feed: join approvals, run approvals, then skill questions. */
export default function AwcOneWindowInFeedCards({
  projectId,
  enabled,
}: AwcOneWindowInFeedCardsProps) {
  return (
    <>
      <AwcOneWindowInFeedApprovals projectId={projectId} enabled={enabled} />
      <AwcOneWindowInFeedRunApprovals projectId={projectId} enabled={enabled} />
      <AwcOneWindowInFeedSkillQuestions
        projectId={projectId}
        enabled={enabled}
      />
    </>
  );
}
