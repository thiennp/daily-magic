import listProjectKnowledgeItemsForProject from "@/lib/projects/knowledge/listProjectKnowledgeItemsForProject";
import updateProjectKnowledgeItemStatus from "@/lib/projects/knowledge/updateProjectKnowledgeItemStatus";

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

  return results.filter(Boolean).length;
};

export default promoteAllProjectKnowledgeCandidates;
