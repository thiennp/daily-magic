import type { ProjectCompositionSnapshotItemWire } from "@agent-witch/shared/protocol";

import resolveProjectBindingSnapshotEntries from "@/lib/projects/composition/resolveProjectBindingSnapshotEntries";
import resolveRunScopedSnapshotEntries from "@/lib/projects/composition/resolveRunScopedSnapshotEntries";

const resolveProjectCompositionSnapshotEntries = async (input: {
  readonly ownerUserId: string;
  readonly projectId: string;
  readonly runScopedComponentIds: readonly string[];
}): Promise<
  | {
      readonly ok: true;
      readonly entries: ProjectCompositionSnapshotItemWire[];
    }
  | { readonly ok: false; readonly errorMessage: string }
> => {
  const projectEntries = await resolveProjectBindingSnapshotEntries(
    input.projectId,
  );
  const skipComponentIds = new Set(
    projectEntries.map((entry) => entry.componentId),
  );
  const runScoped = await resolveRunScopedSnapshotEntries({
    ownerUserId: input.ownerUserId,
    runScopedComponentIds: input.runScopedComponentIds,
    skipComponentIds,
  });

  if (!runScoped.ok) {
    return runScoped;
  }

  return {
    ok: true,
    entries: [...projectEntries, ...runScoped.entries],
  };
};

export default resolveProjectCompositionSnapshotEntries;
