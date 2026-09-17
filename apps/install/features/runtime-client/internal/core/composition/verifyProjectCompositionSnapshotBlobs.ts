import fs from "node:fs";

import type { ProjectCompositionSnapshotWire } from "@agent-witch/shared/protocol";
import type { AgentWitchLocalLayout } from "@agent-witch/install-layout/types";

import resolveComponentStoreBlobPath from "./resolveComponentStoreBlobPath";

const verifyProjectCompositionSnapshotBlobs = (
  layout: AgentWitchLocalLayout,
  snapshot: ProjectCompositionSnapshotWire,
): string | null => {
  const missing: string[] = [];

  for (const entry of snapshot.entries) {
    for (const item of entry.items) {
      const blobPath = resolveComponentStoreBlobPath(
        layout.installDir,
        item.contentSha256,
      );

      if (!fs.existsSync(blobPath)) {
        missing.push(item.contentSha256.slice(0, 12));
      }
    }
  }

  if (missing.length === 0) {
    return null;
  }

  return `Missing ${missing.length} component blob(s) on this Mac. Open Harness to sync, then retry.`;
};

export default verifyProjectCompositionSnapshotBlobs;
