"use client";

import Button from "@/components/ui/button/Button";
import HarnessItemFieldsEditor from "@/features/harness/components/HarnessItemFieldsEditor";
import { HARNESS_KIND_OPTIONS } from "@/features/harness/constants/harnessFormOptions";
import { PLAYBOOK_HARNESS_SECTION } from "@/features/capabilities/playbookBuilderCopy.constant";
import type { HarnessItemDraft } from "@/features/harness/types/HarnessItemDraft.type";
import type { HarnessItemKind } from "@/lib/agentWitch/harness/types/HarnessItemKind.constant";

interface CapabilityHarnessItemsEditorProps {
  readonly items: readonly HarnessItemDraft[];
  readonly onAdd: (kind: HarnessItemKind) => void;
  readonly onRemove: (itemId: string) => void;
  readonly onChange: (nextItem: HarnessItemDraft) => void;
  readonly kinds?: readonly HarnessItemKind[];
  readonly title?: string;
  readonly description?: string;
}

export default function CapabilityHarnessItemsEditor({
  items,
  onAdd,
  onRemove,
  onChange,
  kinds,
  title = PLAYBOOK_HARNESS_SECTION.title,
  description = PLAYBOOK_HARNESS_SECTION.description,
}: CapabilityHarnessItemsEditorProps) {
  const kindOptions =
    kinds === undefined
      ? HARNESS_KIND_OPTIONS
      : HARNESS_KIND_OPTIONS.filter((option) => kinds.includes(option.value));

  return (
    <section className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white/90">
          {title}
        </h3>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          {description}
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        {kindOptions.map((option) => (
          <Button
            key={option.value}
            variant="outline"
            size="sm"
            onClick={() => {
              onAdd(option.value);
            }}
          >
            Add {option.label.toLowerCase()}
          </Button>
        ))}
      </div>
      {items.length > 0 ? (
        <div className="space-y-3">
          {items.map((item, index) => (
            <HarnessItemFieldsEditor
              key={item.id}
              item={item}
              index={index}
              canRemove
              onRemove={() => {
                onRemove(item.id);
              }}
              onChange={onChange}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}
