/** Display name for invite accept chrome (name → email → Someone). */
export const formatHumanInviteInviter = (
  name: string | null,
  email: string | null,
): string => name?.trim() || email?.trim() || "Someone";
