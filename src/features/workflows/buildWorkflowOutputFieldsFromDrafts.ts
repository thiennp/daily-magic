import { slugifyWorkflowFieldKey } from "@/lib/workflows/slugifyWorkflowFieldKey";
import type WorkflowOutputFieldDefinition from "@/lib/workflows/types/WorkflowOutputFieldDefinition.type";
import type DraftWorkflowOutputField from "@/features/workflows/types/DraftWorkflowOutputField.type";

function makeUniqueFieldKey(
  baseKey: string,
  usedKeys: ReadonlySet<string>,
  attempt = 0,
): string {
  const candidate = attempt === 0 ? baseKey : `${baseKey}_${attempt + 1}`;
  return usedKeys.has(candidate)
    ? makeUniqueFieldKey(baseKey, usedKeys, attempt + 1)
    : candidate;
}

export function buildWorkflowOutputFieldsFromDrafts(
  drafts: readonly DraftWorkflowOutputField[],
): readonly WorkflowOutputFieldDefinition[] {
  const usedKeys = new Set<string>();

  return drafts.flatMap((draft) => {
    const label = draft.label.trim();
    if (label.length === 0) {
      return [];
    }

    const baseKey = slugifyWorkflowFieldKey(label);
    const key = makeUniqueFieldKey(baseKey, usedKeys);
    usedKeys.add(key);

    return [
      {
        key,
        label,
        kind: draft.kind,
        required: draft.required,
      },
    ];
  });
}
