import type HarnessManifestSet from "./HarnessManifestSet.type";

export default interface HarnessManifest {
  readonly version: 1;
  readonly hostname: string;
  readonly updatedAt: string;
  readonly activeSetSlugs: readonly string[];
  readonly sets: Readonly<Record<string, HarnessManifestSet>>;
}
