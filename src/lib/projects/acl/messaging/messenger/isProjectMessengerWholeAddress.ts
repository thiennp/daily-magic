/**
 * Whole project message: stored once with no single address (no membership,
 * user, or team) and one delivery row per bot. No other writer stores a row
 * with all three empty (dispatch parse rejects it; notices always set to_user_id).
 */
export const isProjectMessengerWholeAddress = (row: {
  readonly toMembershipId: string | null;
  readonly toUserId: string | null;
  readonly toTeamLabel: string | null;
}): boolean =>
  row.toMembershipId === null &&
  row.toUserId === null &&
  row.toTeamLabel === null;
