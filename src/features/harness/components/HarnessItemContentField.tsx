import type { HarnessItemDraft } from "@/features/harness/types/HarnessItemDraft.type";

const fieldClass =
  "mt-2 w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 shadow-theme-xs outline-none transition focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90";

interface HarnessItemContentFieldProps {
  readonly item: HarnessItemDraft;
  readonly onChange: (nextItem: HarnessItemDraft) => void;
}

export default function HarnessItemContentField({
  item,
  onChange,
}: HarnessItemContentFieldProps) {
  return (
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
        placeholder="Content for the selected writer to save locally…"
        className={fieldClass}
      />
    </label>
  );
}
