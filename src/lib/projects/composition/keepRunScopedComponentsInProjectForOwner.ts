import keepRunScopedComponentsInProject from "@/lib/projects/composition/keepRunScopedComponentsInProject";
import loadAgentRunDispatchCompositionExtras from "@/lib/dispatch/loadAgentRunDispatchCompositionExtras";
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

  const extras = await loadAgentRunDispatchCompositionExtras(input.agentRunId);
  const runScopedEntries =
    extras.projectId === input.projectId
      ? (extras.compositionSnapshot?.entries.filter(
          (entry) => entry.scope === "run",
        ) ?? [])
      : [];

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
