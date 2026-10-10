import type { AwcProjectAccessMember } from "@/features/projects/access/hooks/loadAwcProjectAccess";
import { AwcBotName } from "@/features/projects/bots/public-api/presentation";
import AwcProjectMembersHelperAvatar from "@/features/projects/members/AwcProjectMembersHelperAvatar";

/** Non-owner assistant row label: avatar + name with its brand logo. */
export default function AwcProjectMembersReadOnlyHelperLabel({
  member,
}: {
  readonly member: AwcProjectAccessMember;
}) {
  const name =
    member.projectDisplayName?.trim() ||
    member.displayName ||
    member.userId.slice(0, 8);
  return (
    <span className="flex items-center gap-3 px-3.5 py-2.5 text-sm">
      <AwcProjectMembersHelperAvatar name={name} />
      <AwcBotName name={name} className="flex font-semibold text-awc-fg" />
    </span>
  );
}
