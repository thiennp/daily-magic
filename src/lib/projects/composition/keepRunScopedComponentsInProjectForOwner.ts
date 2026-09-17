import keepRunScopedComponentsInProject from "@/lib/projects/composition/keepRunScopedComponentsInProject";
import listRunScopedEntriesFromAgentRun from "@/lib/projects/composition/listRunScopedEntriesFromAgentRun";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";

const keepRunScopedComponentsInProjectForOwner = async (input: {
  readonly ownerUserId: string;
  readonly projectId: string;
  readonly agentRunId: string;
}): Promise<
  | { readonly ok: true; readonly boundCount: number }
  | { readonly ok: false; readonly errorMessage: string }
> => {
  const project = await getUserProjectById(input.projectId);

  if (project === null || project.ownerUserId !== input.ownerUserId) {
    return { ok: false, errorMessage: "Project not found." };
  }

  const runScopedEntries = await listRunScopedEntriesFromAgentRun(
    input.agentRunId,
  );

  if (runScopedEntries.length === 0) {
    return {
      ok: false,
      errorMessage: "This run has no run-scoped components to keep.",
    };
  }

  const result = await keepRunScopedComponentsInProject({
    ownerUserId: input.ownerUserId,
    projectId: input.projectId,
    runScopedEntries,
  });

  return result;
};

export default keepRunScopedComponentsInProjectForOwner;
