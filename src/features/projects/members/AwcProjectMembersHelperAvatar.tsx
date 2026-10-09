/** Rounded-square Pine-soft initials avatar shared by every assistant row. */
export default function AwcProjectMembersHelperAvatar({
  name,
}: {
  readonly name: string;
}) {
  return (
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] border border-awc-accent-soft-2 bg-awc-accent-soft text-[13px] font-semibold text-awc-primary">
      {name.slice(0, 2).toUpperCase()}
    </span>
  );
}
