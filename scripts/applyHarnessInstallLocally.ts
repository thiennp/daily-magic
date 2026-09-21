import {
  applyHarnessInstallLocally as applyHarnessInstallLocallyWithLayout,
  type ApplyHarnessInstallLocallyResult,
} from "@agent-witch/live-harness";

import type { HarnessInstallBundle } from "./harnessInstallBundle.types";
import { resolveAgentWitchLocalLayout } from "./resolveAgentWitchLocalLayout";

export type { ApplyHarnessInstallLocallyResult };

export const applyHarnessInstallLocally = (input: {
  readonly bundle: HarnessInstallBundle;
  readonly profileEmail?: string;
}): ApplyHarnessInstallLocallyResult => {
  const layout = resolveAgentWitchLocalLayout(input.profileEmail);
  return applyHarnessInstallLocallyWithLayout({
    bundle: input.bundle,
    layout,
  });
};
