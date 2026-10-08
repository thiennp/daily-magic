import { COMPANIES_RULES_HUB_COPY as C } from "@/features/admin/companiesRulesHubCopy.constant";

/** Returns an error message, or an empty string when the name is usable. */
export default function validateCompanyName(
  name: string,
  existingNames: readonly string[],
): string {
  const value = name.trim();
  if (value.length === 0) {
    return C.nameEnter;
  }
  if (value.length < 2) {
    return C.nameShort;
  }
  const lower = value.toLowerCase();
  if (existingNames.some((existing) => existing.toLowerCase() === lower)) {
    return C.nameDuplicate;
  }
  return "";
}
