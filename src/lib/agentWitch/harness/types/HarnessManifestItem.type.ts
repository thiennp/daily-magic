import type { HarnessItemKind } from "./HarnessItemKind.constant";

export default interface HarnessManifestItem {
  readonly id: string;
  readonly kind: HarnessItemKind;
  readonly title: string;
  readonly path: string;
}
