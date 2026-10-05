import listProjectKnowledgeItemsForProject from "@/lib/projects/knowledge/listProjectKnowledgeItemsForProject";
import updateProjectKnowledgeItemStatus from "@/lib/projects/knowledge/updateProjectKnowledgeItemStatus";
import { scheduleProjectUpdatedNotify } from "@/lib/projects/acl/messaging/scheduleProjectUpdatedNotify";

const promoteAllProjectKnowledgeCandidates = async (input: {
  readonly ownerUserId: string;
  readonly projectId: string;
}): Promise<number> => {
  const candidates = await listProjectKnowledgeItemsForProject(
    input.ownerUserId,
    input.projectId,
    ["candidate"],
  );

  const results = await Promise.all(
    candidates.map((item) =>
      updateProjectKnowledgeItemStatus({
        ownerUserId: input.ownerUserId,
        projectId: input.projectId,
        itemId: item.id,
        status: "promoted",
        syncState: "shared",
      }),
    ),
  );

  const promotedCount = results.filter(Boolean).length;
  if (promotedCount > 0) {
    await scheduleProjectUpdatedNotify({
      projectId: input.projectId,
      fields: ["knowledge"],
      actorUserId: input.ownerUserId,
    });
  }
  return promotedCount;
};

export default promoteAllProjectKnowledgeCandidates;
