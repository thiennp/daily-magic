import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import type { HarnessInstallBundle } from "./harnessInstallBundle.types";
import { planHarnessInstallBundle } from "./planHarnessInstallBundle";
import { resolveAgentWitchLocalLayout } from "./resolveAgentWitchLocalLayout";

interface HarnessManifest {
  readonly version: 1;
}

export interface ApplyHarnessInstallLocallyResult {
  readonly ok: boolean;
  readonly errorMessage?: string;
  readonly writtenItemCount?: number;
}

const readHarnessManifest = (
  manifestPath: string,
): Parameters<typeof planHarnessInstallBundle>[0]["existingManifest"] => {
  if (!fs.existsSync(manifestPath)) {
    return null;
  }

  try {
    const parsed: unknown = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
    if (
      typeof parsed === "object" &&
      parsed !== null &&
      (parsed as HarnessManifest).version === 1
    ) {
      return parsed as Parameters<
        typeof planHarnessInstallBundle
      >[0]["existingManifest"];
    }
  } catch {
    return null;
  }

  return null;
};

export const applyHarnessInstallLocally = (input: {
  readonly bundle: HarnessInstallBundle;
  readonly profileEmail?: string;
}): ApplyHarnessInstallLocallyResult => {
  const layout = resolveAgentWitchLocalLayout(input.profileEmail);

  try {
    const existingManifest = readHarnessManifest(layout.harnessManifestPath);
    const plan = planHarnessInstallBundle({
      bundle: input.bundle,
      hostname: os.hostname(),
      existingManifest,
    });

    fs.mkdirSync(layout.harnessRootDir, { recursive: true });

    for (const directory of plan.directories) {
      fs.mkdirSync(path.join(layout.harnessRootDir, directory), {
        recursive: true,
      });
    }

    for (const file of plan.files) {
      const absolutePath = path.join(layout.harnessRootDir, file.relativePath);
      fs.mkdirSync(path.dirname(absolutePath), { recursive: true });
      fs.writeFileSync(absolutePath, file.content);
    }

    fs.writeFileSync(
      layout.harnessManifestPath,
      `${JSON.stringify(plan.manifest, null, 2)}\n`,
    );

    return {
      ok: true,
      writtenItemCount: plan.files.length,
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Harness install failed.";
    return {
      ok: false,
      errorMessage: message,
    };
  }
};
