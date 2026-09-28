export const buildMarketplaceInstalledTaskComposerInput = (input: {
  readonly libraryCapabilityId: string;
  readonly exampleRequest: string;
  readonly deviceId: string;
  readonly projectId: string;
}): {
  readonly libraryCapabilityId: string;
  readonly prompt: string;
  readonly deviceId: string;
  readonly projectId: string;
} => ({
  libraryCapabilityId: input.libraryCapabilityId,
  prompt: input.exampleRequest,
  deviceId: input.deviceId,
  projectId: input.projectId,
});
