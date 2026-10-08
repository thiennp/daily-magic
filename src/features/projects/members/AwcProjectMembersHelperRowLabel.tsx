"use client";

/** Assistant row toggle: rounded-square Pine-soft avatar, name and optional wake-health line. */
export default function AwcProjectMembersHelperRowLabel({
  name,
  line,
  expanded,
  onToggle,
}: {
  readonly name: string;
  readonly line: string | null;
  readonly expanded: boolean;
  readonly onToggle: () => void;
}) {
  return (
    <button
      type="button"
      className="flex min-w-0 flex-1 items-center gap-3 text-left"
      aria-expanded={expanded}
      onClick={onToggle}
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] border border-awc-accent-soft-2 bg-awc-accent-soft text-[13px] font-semibold text-awc-primary">
        {name.slice(0, 2).toUpperCase()}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate font-semibold text-awc-fg">{name}</span>
        {line ? (
          <span className="block text-[12px] text-awc-fg-subtle">{line}</span>
        ) : null}
      </span>
    </button>
  );
}
