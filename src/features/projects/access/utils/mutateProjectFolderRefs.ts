/** POST body: picker sends `deviceId` and mirrors it in `machineOrDeviceRef`. */
export const buildAddFolderRefBody = (input: {
  readonly deviceId: string;
  readonly folderPath: string;
}) => ({
  deviceId: input.deviceId,
  machineOrDeviceRef: input.deviceId,
  folderPath: input.folderPath,
});

export const addProjectFolderRef = async (input: {
  readonly projectId: string;
  readonly deviceId: string;
  readonly folderPath: string;
}): Promise<{
  readonly ok: boolean;
  readonly code?: string;
  readonly errorMessage?: string;
}> => {
  const response = await fetch(`/api/projects/${input.projectId}/folder-refs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(buildAddFolderRefBody(input)),
  });
  return response.json() as Promise<{
    readonly ok: boolean;
    readonly code?: string;
    readonly errorMessage?: string;
  }>;
};

export const removeProjectFolderRef = async (input: {
  readonly projectId: string;
  readonly refId: string;
}): Promise<{ readonly ok: boolean; readonly errorMessage?: string }> => {
  const response = await fetch(
    `/api/projects/${input.projectId}/folder-refs/${input.refId}`,
    { method: "DELETE" },
  );
  return response.json() as Promise<{
    readonly ok: boolean;
    readonly errorMessage?: string;
  }>;
};
