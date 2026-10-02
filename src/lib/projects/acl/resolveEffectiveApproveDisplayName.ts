/** Owner-provided name wins; else pending suggestion (when still present). */
export const resolveEffectiveApproveDisplayName = (input: {
  readonly ownerProjectDisplayName?: string | null;
  readonly suggestedProjectDisplayName: string | null;
}): string | null | undefined => {
  const owner = input.ownerProjectDisplayName;
  if (typeof owner === "string" && owner.trim().length > 0) {
    return owner;
  }
  if (
    typeof input.suggestedProjectDisplayName === "string" &&
    input.suggestedProjectDisplayName.trim().length > 0
  ) {
    return input.suggestedProjectDisplayName;
  }
  return owner;
};
