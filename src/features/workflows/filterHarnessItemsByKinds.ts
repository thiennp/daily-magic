import type { HarnessItemKind } from "@/lib/agentWitch/harness/types/HarnessItemKind.constant";

export const filterHarnessItemsByKinds = <
  T extends { readonly kind: HarnessItemKind },
>(
  items: readonly T[],
  kinds: readonly HarnessItemKind[],
): readonly T[] => items.filter((item) => kinds.includes(item.kind));
