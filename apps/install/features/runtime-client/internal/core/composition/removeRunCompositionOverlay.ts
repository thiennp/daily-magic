import fs from "node:fs";
import path from "node:path";

import type { AgentWitchLocalLayout } from "@agent-witch/install-layout/types";

import { isSafeRunId } from "./safeRunPaths";

const removeRunCompositionOverlay = (
  layout: AgentWitchLocalLayout,
  runId: string,
): void => {
  // A run id that is not a plain name could point rmSync above the runs folder.
  if (!isSafeRunId(runId)) {
    return;
  }
  const overlayRoot = path.join(layout.installDir, "runs", runId);

  if (!fs.existsSync(overlayRoot)) {
    return;
  }

  fs.rmSync(overlayRoot, { recursive: true, force: true });
};

export default removeRunCompositionOverlay;
