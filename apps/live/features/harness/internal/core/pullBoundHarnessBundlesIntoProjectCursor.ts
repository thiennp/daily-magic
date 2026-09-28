import type { AgentWitchLocalLayout } from "@agent-witch/install-layout/types";

import { applyHarnessInstallLocally } from "./applyHarnessInstallLocally";
import {
  applyInstalledHarnessSetsToProjectCursor,
  type ApplyInstalledHarnessSetsToProjectCursorResult,
} from "./applyInstalledHarnessSetsToProjectCursor";
import type { HarnessInstallBundle } from "./harnessInstallBundle.types";

export const pullBoundHarnessBundlesIntoProjectCursor = (input: {
  readonly layout: AgentWitchLocalLayout;
  readonly projectFolderPath: string;
  readonly bundles: readonly HarnessInstallBundle[];
}): ApplyInstalledHarnessSetsToProjectCursorResult => {
  if (input.bundles.length === 0) {
    return {
      ok: false,
      errorMessage: "No playbook files are linked to this project.",
    };
  }

  for (const bundle of input.bundles) {
    const installed = applyHarnessInstallLocally({
      bundle,
      layout: input.layout,
    });
    if (!installed.ok) {
      return {
        ok: false,
        errorMessage:
          installed.errorMessage ??
          "Could not store playbook files on this computer.",
      };
    }
  }

  return applyInstalledHarnessSetsToProjectCursor({
    layout: input.layout,
    projectFolderPath: input.projectFolderPath,
    setSlugs: input.bundles.map((bundle) => bundle.slug),
  });
};
