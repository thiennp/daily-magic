import type { HarnessItemKind } from "./HarnessItemKind.constant";

export default interface HarnessItemSpec {
  readonly id: string;
  readonly kind: HarnessItemKind;
  readonly title: string;
  readonly content: string;
}
