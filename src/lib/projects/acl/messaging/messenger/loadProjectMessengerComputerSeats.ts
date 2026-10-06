/**
 * Active owner-computer / This computer agent seats for task assign.
 * GAP (2026-10-05): ProjectMemberKind is only human|bot on main; Connect
 * exposes devices, not project_memberships rows for This computer. Returns []
 * until Mac lands a synthetic-agent membership (user_id ≠ owner human).
 * Dispatch via toMembershipId already accepts any active seat.
 */
export type ProjectMessengerComputerSeat = {
  readonly membershipId: string;
  readonly userId: string;
  readonly displayName: string | null;
};

export const loadProjectMessengerComputerSeats = async (
  projectId: string,
): Promise<readonly ProjectMessengerComputerSeat[]> => {
  void projectId;
  return [];
};
