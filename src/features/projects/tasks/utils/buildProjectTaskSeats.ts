import type { AccessMembershipView } from "@/features/projects/access/utils/projectAccessApi.types";

export type ProjectTaskSeat = {
  readonly id: string;
  readonly label: string;
};

const seatName = (m: AccessMembershipView): string =>
  [m.projectDisplayName, m.displayName, m.email]
    .map((name) => name?.trim() ?? "")
    .find((name) => name.length > 0) ?? "";

/** Active, non-viewer seats a task can be assigned to (computers and assistants may only carry `displayName`). */
export const buildProjectTaskSeats = (
  members: readonly AccessMembershipView[],
  hintFor: (memberKind: string | undefined) => string,
): readonly ProjectTaskSeat[] =>
  members
    .filter(
      (m) =>
        (m.status === undefined || m.status === "active") &&
        m.role !== "viewer" &&
        m.canMessage !== false &&
        seatName(m).length > 0,
    )
    .map((m) => ({
      id: m.id,
      label: `${seatName(m)}${hintFor(m.memberKind)}`,
    }));
