import type { ProjectPitfallView } from "@/features/project-pitfalls/internal/core/projectPitfall.type";
import { writeProjectActivityEvent } from "@/lib/projects/acl/activity/writeProjectActivityEvent";

/**
 * One owner Access log line per real drop/restore (never throws). source_ref
 * is keyed on the state the change was made from, so a double-submitted drop
 * of the same rule state can only ever land one line.
 */
export const logProjectRuleActivity = async (input: {
  readonly projectId: string;
  readonly actorUserId: string;
  readonly action: "dropped" | "restored";
  readonly before: ProjectPitfallView;
}): Promise<void> => {
  const { before } = input;
  await writeProjectActivityEvent({
    projectId: input.projectId,
    type: input.action === "dropped" ? "rule.dropped" : "rule.restored",
    actor: { kind: "owner", userId: input.actorUserId },
    detail: { ruleId: before.id, label: before.symptom },
    sourceRef: [
      "rule",
      input.projectId,
      before.id,
      input.action,
      before.updatedAt ?? "seed",
    ].join(":"),
  });
};
