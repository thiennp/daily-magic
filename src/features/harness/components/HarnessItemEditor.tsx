import { HARNESS_KIND_OPTIONS } from "@/features/harness/constants/harnessFormOptions";
import type { HarnessItemDraft } from "@/features/harness/types/HarnessItemDraft.type";
import type { HarnessItemKind } from "@/lib/agentWitch/harness/types/HarnessItemKind.constant";

interface HarnessItemEditorProps {
  readonly item: HarnessItemDraft;
  readonly index: number;
  readonly canRemove: boolean;
  readonly onRemove: () => void;
  readonly onChange: (nextItem: HarnessItemDraft) => void;
}

export default function HarnessItemEditor({
  item,
  index,
  canRemove,
  onRemove,
  onChange,
}: HarnessItemEditorProps) {
  return (
    <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-gray-800 dark:text-white/90">
          Item {index + 1}
        </p>
        {canRemove ? (
          <button
            type="button"
            onClick={onRemove}
            className="text-xs font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            Remove
          </button>
        ) : null}
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <label className="block text-sm">
          <span className="font-medium text-gray-800 dark:text-white/90">
            Type
          </span>
          <select
            value={item.kind}
            onChange={(event) => {
              onChange({
                ...item,
                kind: event.target.value as HarnessItemKind,
              });
            }}
            className="mt-2 w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 shadow-theme-xs outline-none transition focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
          >
            {HARNESS_KIND_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-sm">
          <span className="font-medium text-gray-800 dark:text-white/90">
            Title
          </span>
          <input
            type="text"
            value={item.title}
            onChange={(event) => {
              onChange({ ...item, title: event.target.value });
            }}
            placeholder="Prefer const"
            className="mt-2 w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 shadow-theme-xs outline-none transition focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
          />
        </label>
      </div>

      <label className="mt-3 block text-sm">
        <span className="font-medium text-gray-800 dark:text-white/90">
          Content
        </span>
        <textarea
          value={item.content}
          onChange={(event) => {
            onChange({ ...item, content: event.target.value });
          }}
          rows={6}
          placeholder="Harness content for the selected writer to save locally…"
          className="mt-2 w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 shadow-theme-xs outline-none transition focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
        />
      </label>
    </div>
  );
}
