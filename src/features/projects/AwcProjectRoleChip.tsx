import { HUMAN_INVITE_UI_COPY } from "@/features/projects/access/humanInvites/humanInviteUiCopy.constant";
import type { ProjectPageActorRole } from "@/lib/projects/acl/humanInvites/authorizeProjectPageActor";

/** Member / Viewer chip above the project header (hidden for owners). */
export default function AwcProjectRoleChip({
  pageActorRole,
}: {
  readonly pageActorRole: ProjectPageActorRole;
}) {
  const copy = HUMAN_INVITE_UI_COPY;
  const roleChip =
    pageActorRole === "member"
      ? copy.roleChipMember
      : pageActorRole === "viewer"
        ? copy.roleChipViewer
        : null;
  if (roleChip === null) {
    return null;
  }
  return (
    <p className="inline-flex w-fit rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700 ring-1 ring-gray-200 dark:bg-white/10 dark:text-gray-200 dark:ring-white/15">
      {roleChip}
    </p>
  );
}
