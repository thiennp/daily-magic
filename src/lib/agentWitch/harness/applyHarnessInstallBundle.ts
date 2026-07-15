import fs from "node:fs";
import path from "node:path";

import { planHarnessInstallBundle } from "./planHarnessInstallBundle";
import type HarnessInstallBundle from "./types/HarnessInstallBundle.type";
import type HarnessManifest from "./types/HarnessManifest.type";

export interface ApplyHarnessInstallBundleInput {
  readonly bundle: HarnessInstallBundle;
  readonly harnessRootDir: string;
  readonly harnessManifestPath: string;
  readonly hostname: string;
}

export interface ApplyHarnessInstallBundleResult {
  readonly ok: boolean;
  readonly errorMessage?: string;
  readonly writtenItemCount?: number;
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const readHarnessManifest = (manifestPath: string): HarnessManifest | null => {
  if (!fs.existsSync(manifestPath)) {
    return null;
  }

  try {
    const parsed: unknown = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
    if (!isRecord(parsed) || parsed.version !== 1) {
      return null;
    }

    return parsed as unknown as HarnessManifest;
  } catch {
    return null;
  }
};

const applyHarnessInstallBundle = (
  input: ApplyHarnessInstallBundleInput,
): ApplyHarnessInstallBundleResult => {
  try {
    const existingManifest = readHarnessManifest(input.harnessManifestPath);
    const plan = planHarnessInstallBundle({
      bundle: input.bundle,
      hostname: input.hostname,
      existingManifest,
    });

    fs.mkdirSync(input.harnessRootDir, { recursive: true });

    for (const directory of plan.directories) {
      fs.mkdirSync(path.join(input.harnessRootDir, directory), {
        recursive: true,
      });
    }

    for (const file of plan.files) {
      const absolutePath = path.join(input.harnessRootDir, file.relativePath);
      fs.mkdirSync(path.dirname(absolutePath), { recursive: true });
      fs.writeFileSync(absolutePath, file.content);
    }

    fs.writeFileSync(
      input.harnessManifestPath,
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

export default applyHarnessInstallBundle;
