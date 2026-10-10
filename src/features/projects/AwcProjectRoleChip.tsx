import { HUMAN_INVITE_UI_COPY } from "@/features/projects/access/humanInvites/public-api/types";
import { PROJECT_V5_NEUTRAL_CHIP_CLASS } from "@/features/projects/projectPageV5ChromeClasses.constant";
import type { ProjectPageActorRole } from "@/lib/projects/acl/humanInvites/authorizeProjectPageActor";

/** Member / Viewer chip beside the header status (hidden for owners). */
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
  return <p className={PROJECT_V5_NEUTRAL_CHIP_CLASS}>{roleChip}</p>;
}
