import type HarnessManifestItem from "./HarnessManifestItem.type";

export default interface HarnessManifestSet {
  readonly slug: string;
  readonly name: string;
  readonly version: number;
  readonly updatedAt: string;
  readonly items: readonly HarnessManifestItem[];
}
