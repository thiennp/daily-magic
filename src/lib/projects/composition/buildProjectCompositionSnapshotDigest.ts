import { createHash } from "node:crypto";

import type { ProjectCompositionSnapshotItemWire } from "@agent-witch/shared/protocol";

const buildProjectCompositionSnapshotDigest = (
  entries: readonly ProjectCompositionSnapshotItemWire[],
): string => {
  const normalized = [...entries]
    .map((entry) => ({
      componentId: entry.componentId,
      versionId: entry.versionId,
      kind: entry.kind,
      scope: entry.scope,
      items: [...entry.items]
        .map((item) => ({
          contentSha256: item.contentSha256,
          itemKey: item.itemKey,
          relativePath: item.relativePath,
        }))
        .sort((left, right) => left.itemKey.localeCompare(right.itemKey)),
    }))
    .sort((left, right) => left.componentId.localeCompare(right.componentId));

  return createHash("sha256").update(JSON.stringify(normalized)).digest("hex");
};

export default buildProjectCompositionSnapshotDigest;
