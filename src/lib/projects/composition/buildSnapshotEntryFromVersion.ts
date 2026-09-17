import type {
  CompositionSnapshotComponentKind,
  ProjectCompositionSnapshotItemWire,
} from "@agent-witch/shared/protocol";

import loadComponentVersionItemsForSnapshot from "@/lib/projects/composition/loadComponentVersionItemsForSnapshot";

const buildSnapshotEntryFromVersion = async (input: {
  readonly componentId: string;
  readonly kind: CompositionSnapshotComponentKind;
  readonly scope: "project" | "run";
  readonly versionId: string;
}): Promise<ProjectCompositionSnapshotItemWire | null> => {
  const items = await loadComponentVersionItemsForSnapshot(input.versionId);

  if (items.length === 0) {
    return null;
  }

  return {
    componentId: input.componentId,
    versionId: input.versionId,
    kind: input.kind,
    scope: input.scope,
    items,
  };
};

export default buildSnapshotEntryFromVersion;
