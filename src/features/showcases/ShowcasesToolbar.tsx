import { ALL_SHOWCASE_GROUPS } from "@/features/showcases/filterShowcaseGroups";
import type { ShowcaseGroup } from "@/features/showcases/filterShowcaseGroups";

interface ShowcasesToolbarProps {
  readonly groups: readonly ShowcaseGroup[];
  readonly query: string;
  readonly groupId: string;
  readonly onQueryChange: (value: string) => void;
  readonly onGroupChange: (id: string) => void;
}

const segClass = (pressed: boolean): string =>
  `min-h-[30px] whitespace-nowrap rounded-md px-3 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-awc-blue-600 ${
    pressed
      ? "bg-awc-surface font-semibold text-awc-fg shadow-sm"
      : "text-awc-fg-muted"
  }`;

export default function ShowcasesToolbar({
  groups,
  query,
  groupId,
  onQueryChange,
  onGroupChange,
}: ShowcasesToolbarProps) {
  const options = [{ id: ALL_SHOWCASE_GROUPS, title: "All" }, ...groups];
  return (
    <div className="mt-8 flex flex-col gap-4">
      <div className="relative max-w-sm">
        <label className="sr-only" htmlFor="showcases-search">
          Search showcases
        </label>
        <input
          id="showcases-search"
          type="search"
          value={query}
          placeholder="Search showcases…"
          autoComplete="off"
          spellCheck={false}
          onChange={(e) => onQueryChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Escape" && query !== "") {
              e.preventDefault();
              onQueryChange("");
            }
          }}
          className="min-h-9 w-full rounded-md border border-awc-control-border bg-awc-surface px-3 text-sm text-awc-fg placeholder:text-awc-fg-subtle focus-visible:outline-2 focus-visible:outline-awc-blue-600"
        />
      </div>
      <div
        role="group"
        aria-label="Category"
        className="inline-flex max-w-full flex-wrap gap-0.5 self-start rounded-lg bg-awc-fill p-[3px]"
      >
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            aria-pressed={groupId === option.id}
            onClick={() => onGroupChange(option.id)}
            className={segClass(groupId === option.id)}
          >
            {option.title}
          </button>
        ))}
      </div>
    </div>
  );
}
