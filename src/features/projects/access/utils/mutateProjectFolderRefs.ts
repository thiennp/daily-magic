export const addProjectFolderRef = async (input: {
  readonly projectId: string;
  readonly machineOrDeviceRef: string;
  readonly folderPath: string;
}): Promise<{ readonly ok: boolean; readonly errorMessage?: string }> => {
  const response = await fetch(`/api/projects/${input.projectId}/folder-refs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      machineOrDeviceRef: input.machineOrDeviceRef,
      folderPath: input.folderPath,
    }),
  });
  return response.json() as Promise<{
    readonly ok: boolean;
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
