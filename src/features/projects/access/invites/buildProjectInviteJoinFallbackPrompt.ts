/** Join step — no parsable token: tell the bot to ask for a new invite. */
export const buildProjectInviteJoinFallbackPrompt = (input: {
  readonly projectLine: string | null;
}): string => {
  const fallback = [
    "Join this Agent Witch project via invite redeem.",
    "Could not parse invite token from the URL — ask the owner to create a new invite and Copy prompt again.",
  ];
  if (input.projectLine) fallback.push(input.projectLine);
  return fallback.join(String.fromCharCode(10));
};
