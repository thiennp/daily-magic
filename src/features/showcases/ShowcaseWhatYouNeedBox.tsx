import type { ShowcaseSupportLevel } from "@/features/showcases/types/ShowcaseArticle.type";

interface ShowcaseWhatYouNeedBoxProps {
  readonly items: readonly string[];
  readonly supportLevel: ShowcaseSupportLevel;
}

const SUPPORT_LABEL_MAP: Record<ShowcaseSupportLevel, string> = {
  full: "Fully supported today",
  partial: "Supported with caveats",
};

export default function ShowcaseWhatYouNeedBox({
  items,
  supportLevel,
}: ShowcaseWhatYouNeedBoxProps) {
  return (
    <aside className="rounded-2xl border border-amber-200 bg-amber-50/80 p-5 dark:border-amber-900/40 dark:bg-amber-950/20">
      <p className="text-xs font-semibold uppercase tracking-wide text-amber-800 dark:text-amber-300">
        What you need · {SUPPORT_LABEL_MAP[supportLevel]}
      </p>
      <ul className="mt-3 space-y-2 text-sm text-amber-950 dark:text-amber-100/90">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span aria-hidden="true">·</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
