export type OverviewFolderPrompt = "none" | "first" | "this_computer";

/**
 * What the Overview folder prompt should say: "first" when the project has
 * no folder anywhere, "this_computer" when this computer is known but has
 * none, else nothing.
 */
export const resolveOverviewFolderPrompt = (input: {
  readonly folderRefs: readonly { readonly machineOrDeviceRef: string }[];
  readonly thisDeviceId: string | null;
}): OverviewFolderPrompt => {
  if (input.folderRefs.length === 0) return "first";
  if (
    input.thisDeviceId !== null &&
    !input.folderRefs.some((r) => r.machineOrDeviceRef === input.thisDeviceId)
  ) {
    return "this_computer";
  }
  return "none";
};
