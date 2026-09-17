import fs from "node:fs";
import path from "node:path";

import type { AgentWitchLocalLayout } from "@agent-witch/install-layout/types";

const removeRunCompositionOverlay = (
  layout: AgentWitchLocalLayout,
  runId: string,
): void => {
  const overlayRoot = path.join(layout.installDir, "runs", runId);

  if (!fs.existsSync(overlayRoot)) {
    return;
  }

  fs.rmSync(overlayRoot, { recursive: true, force: true });
};

export default removeRunCompositionOverlay;
