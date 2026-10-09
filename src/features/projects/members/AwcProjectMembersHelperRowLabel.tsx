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
      className="flex min-w-[4.5rem] flex-1 shrink items-center gap-3 overflow-hidden text-left"
      aria-expanded={expanded}
      onClick={onToggle}
    >
      <AwcProjectMembersHelperAvatar name={name} />
      <span className="min-w-0 flex-1 overflow-hidden">
        <AwcBotName
          name={name}
          className="flex max-w-full font-semibold text-awc-fg"
        />
        {line ? (
          <span className="block text-[12px] text-awc-fg-subtle">{line}</span>
        ) : null}
      </span>
    </button>
  );
}
