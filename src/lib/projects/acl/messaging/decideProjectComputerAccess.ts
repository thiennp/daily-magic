export type ProjectComputerAccessDecision =
  | { readonly allow: true }
  | {
      readonly allow: false;
      readonly reason: "not_found" | "forbidden" | "no_project_computer";
    };

/**
 * Pure rule: only the project owner's project computer (user_projects.device_id,
 * the Mac the project is linked to) may post computerAcks or history reports.
 * A device of another user reads as not_found, like other device routes.
 */
export const decideProjectComputerAccess = (input: {
  readonly deviceId: string;
  readonly deviceUserId: string;
  readonly projectOwnerUserId: string | null;
  readonly projectDeviceId: string | null;
}): ProjectComputerAccessDecision => {
  if (
    input.projectOwnerUserId === null ||
    input.projectOwnerUserId !== input.deviceUserId
  ) {
    return { allow: false, reason: "not_found" };
  }
  if (input.projectDeviceId === null) {
    return { allow: false, reason: "no_project_computer" };
  }
  if (input.projectDeviceId !== input.deviceId) {
    return { allow: false, reason: "forbidden" };
  }
  return { allow: true };
};
