import fs from "node:fs";
import path from "node:path";

import type { ProjectCompositionSnapshotWire } from "@agent-witch/shared/protocol";
import type { AgentWitchLocalLayout } from "@agent-witch/install-layout/types";

import resolveComponentStoreBlobPath from "./resolveComponentStoreBlobPath";

const resolveRunOverlayRoot = (
  layout: AgentWitchLocalLayout,
  runId: string,
): string => path.join(layout.installDir, "runs", runId, "overlay");

export const resolveRunCompositionOverlayCursorDir = (
  layout: AgentWitchLocalLayout,
  runId: string,
): string => path.join(resolveRunOverlayRoot(layout, runId), ".cursor");

const materializeRunScopedCompositionOverlay = (
  layout: AgentWitchLocalLayout,
  runId: string,
  snapshot: ProjectCompositionSnapshotWire,
):
  | { readonly ok: true }
  | { readonly ok: false; readonly errorMessage: string } => {
  const runEntries = snapshot.entries.filter((entry) => entry.scope === "run");

  if (runEntries.length === 0) {
    return { ok: true };
  }

  const cursorRoot = resolveRunCompositionOverlayCursorDir(layout, runId);
  fs.mkdirSync(cursorRoot, { recursive: true });

  for (const entry of runEntries) {
    for (const item of entry.items) {
      const sourcePath = resolveComponentStoreBlobPath(
        layout.installDir,
        item.contentSha256,
      );

      if (!fs.existsSync(sourcePath)) {
        return {
          ok: false,
          errorMessage:
            "Run overlay materialization failed — component blob missing on this Mac.",
        };
      }

      const relative = item.relativePath.trim().replace(/^\/+/, "");
      const targetPath =
        relative.length > 0
          ? path.join(cursorRoot, relative)
          : path.join(cursorRoot, item.itemKey);

      fs.mkdirSync(path.dirname(targetPath), { recursive: true });
      fs.copyFileSync(sourcePath, targetPath);
    }
  }

  return { ok: true };
};

export default materializeRunScopedCompositionOverlay;
