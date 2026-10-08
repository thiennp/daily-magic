import { COMPANIES_RULES_HUB_COPY as C } from "@/features/admin/companiesRulesHubCopy.constant";

/** Returns an error message, or an empty string when the email can be invited. */
export default function validateInviteEmail(
  email: string,
  memberEmails: readonly string[],
): string {
  const value = email.trim().toLowerCase();
  if (value.length === 0) {
    return C.inviteEnter;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return C.inviteInvalid;
  }
  if (memberEmails.some((existing) => existing.toLowerCase() === value)) {
    return C.inviteDuplicate;
  }
  return "";
}
