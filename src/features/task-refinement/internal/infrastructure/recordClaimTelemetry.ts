import { recordBotClaim } from "@/lib/knowledge/bots/recordBotKnowledgeEvents";
import type { ProjectTaskWriter } from "@/lib/projects/tasks/authorizeProjectTaskWriter";
import type { ProjectTaskRefinement } from "@/lib/projects/tasks/refine/projectTaskRefinement.type";

/** Knowledge-impact telemetry for a claim: assistants only (humans' sessions are measured by the hook). */
export const recordClaimTelemetry = async (input: {
  readonly writer: Extract<ProjectTaskWriter, { ok: true }>;
  readonly projectId: string;
  readonly taskId: string;
  readonly claim: ProjectTaskRefinement;
  readonly actorUserId: string;
}): Promise<void> => {
  const { membership } = input.writer;
  if (membership?.memberKind !== "bot") return;
  await recordBotClaim({
    projectId: input.projectId,
    taskId: input.taskId,
    fence: input.claim.claimFence,
    membershipId: membership.id,
    actorUserId: input.actorUserId,
    skillId: input.claim.skillId,
    effortTier: input.claim.effortTier,
  });
};
