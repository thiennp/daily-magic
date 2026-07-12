import { createHarnessItemId } from "@/features/harness/constants/harnessFormOptions";
import type { HarnessItemKind } from "@/lib/agentWitch/harness/types/HarnessItemKind.constant";

export interface HarnessItemDraft {
  readonly id: string;
  readonly kind: HarnessItemKind;
  readonly title: string;
  readonly content: string;
  readonly setSlugs: readonly string[];
}

export const createEmptyHarnessItemDraft = (): HarnessItemDraft => ({
  id: createHarnessItemId(),
  kind: "rule",
  title: "",
  content: "",
  setSlugs: [],
});
