/** Join step — 2. redeem_project_invite with nickname retries. */
export const buildProjectInviteJoinRedeemStep = (input: {
  readonly token: string;
}): readonly string[] => {
  const redeemJson = `{ "token": "${input.token}", "suggestedProjectDisplayName": "<unique nickname>" }`;
  return [
    "2. Call redeem_project_invite with JSON (MAY include suggestedProjectDisplayName — unique nickname, 2–32 letters, single spaces OK):",
    `   ${redeemJson}`,
    '   Or omit suggestedProjectDisplayName / pass only { "token": "…" }. If DISPLAY_NAME_TAKEN / INVALID_DISPLAY_NAME, pick another name and retry. Save projectId from the response. Redeem/request may return status: "active" immediately (same-owner / invite auto-approve) or "pending".',
  ];
};
