/** Access roster row shape needed to spot a computer seat. */
export type AccessMemberComputerKindFields = {
  readonly memberKind?: "human" | "bot" | "computer" | string;
};

/** Computer seats only come from server `memberKind` (never inferred from isAgent). */
export const isComputerAccessMember = (
  member: AccessMemberComputerKindFields,
): boolean => member.memberKind === "computer";
