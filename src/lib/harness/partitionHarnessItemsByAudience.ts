import type { HarnessItemKind } from "@/lib/agentWitch/harness/types/HarnessItemKind.constant";
import type OperatorStepDefinition from "@/lib/workflows/types/OperatorStepDefinition.type";

export const OPERATOR_HARNESS_KIND =
  "operator" as const satisfies HarnessItemKind;

export const isOperatorHarnessKind = (
  kind: HarnessItemKind,
): kind is typeof OPERATOR_HARNESS_KIND => kind === OPERATOR_HARNESS_KIND;

interface HarnessItemWithKind {
  readonly kind: HarnessItemKind;
  readonly id: string;
  readonly title: string;
  readonly content: string;
}

export const mapHarnessItemsToOperatorSteps = (
  items: readonly HarnessItemWithKind[],
): readonly OperatorStepDefinition[] =>
  items
    .filter((item) => isOperatorHarnessKind(item.kind))
    .map((item) => ({
      id: item.id,
      title: item.title,
      content: item.content,
    }));

export const filterAgentHarnessItemsForInstall = <
  T extends HarnessItemWithKind,
>(
  items: readonly T[],
): readonly T[] => items.filter((item) => !isOperatorHarnessKind(item.kind));

export const partitionHarnessItemsByAudience = <T extends HarnessItemWithKind>(
  items: readonly T[],
): {
  readonly agentItems: readonly T[];
  readonly operatorSteps: readonly OperatorStepDefinition[];
} => {
  const operatorSteps = mapHarnessItemsToOperatorSteps(items);
  const agentItems = filterAgentHarnessItemsForInstall(items);

  return { agentItems, operatorSteps };
};
