import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const APP_ROOT = path.resolve(__dirname, "../../..");

export type RefactoringSafetyTierName = "fast" | "standard" | "full";

export interface RefactoringSafetyTier {
  readonly label: string;
  readonly when: string;
  readonly vitestConfig: string | null;
  readonly npmScripts: readonly string[];
}

export interface RefactoringSafetyManifest {
  readonly version: number;
  readonly description: string;
  readonly tiers: Record<RefactoringSafetyTierName, RefactoringSafetyTier>;
  readonly deployables: Record<string, { readonly vitest: readonly string[] }>;
  readonly optionalLocal?: {
    readonly description: string;
    readonly playwright: readonly string[];
    readonly npmScripts: readonly string[];
  };
}

const MANIFEST_PATH = path.join(
  APP_ROOT,
  "test/refactoring-safety.manifest.json",
);

export const getRefactoringSafetyManifestPath = (): string => MANIFEST_PATH;

export const loadRefactoringSafetyManifest = (): RefactoringSafetyManifest => {
  const raw = readFileSync(MANIFEST_PATH, "utf8");
  return JSON.parse(raw) as RefactoringSafetyManifest;
};

export const getAppRoot = (): string => APP_ROOT;
