"use client";

import AwcProjectMembersHelperAvatar from "@/features/projects/members/AwcProjectMembersHelperAvatar";
import AwcBotName from "@/features/projects/bots/AwcBotName";

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
      className="flex min-w-[8rem] flex-1 shrink items-center gap-3 text-left"
      aria-expanded={expanded}
      onClick={onToggle}
    >
      <AwcProjectMembersHelperAvatar name={name} />
      <span className="min-w-0">
        <AwcBotName name={name} className="flex font-semibold text-awc-fg" />
        {line ? (
          <span className="block text-[12px] text-awc-fg-subtle">{line}</span>
        ) : null}
      </span>
    </button>
  );
}
