export const HARNESS_INSTALL_ITEM_KINDS = [
  "rule",
  "skill",
  "command",
  "instruction",
  "agent",
] as const;

export type HarnessInstallItemKind =
  (typeof HARNESS_INSTALL_ITEM_KINDS)[number];

export interface HarnessInstallBundleItem {
  readonly id: string;
  readonly kind: HarnessInstallItemKind;
  readonly title: string;
  readonly content: string;
  readonly setSlugs: readonly string[];
}

export interface HarnessInstallBundle {
  readonly name: string;
  readonly slug: string;
  readonly items: readonly HarnessInstallBundleItem[];
}
