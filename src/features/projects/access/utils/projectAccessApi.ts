export const fetchProjectAccess = async (projectId: string) => {
  const response = await fetch(`/api/projects/${projectId}/access`, {
    cache: "no-store",
  });
  return response.json() as Promise<{
    readonly ok: boolean;
    readonly members?: readonly {
      readonly id: string;
      readonly userId: string;
      readonly teamLabel: string | null;
      readonly scopes: readonly string[];
      readonly createdAt: string;
    }[];
    readonly pendingRequests?: readonly {
      readonly id: string;
      readonly requesterUserId: string;
      readonly reason: string | null;
      readonly createdAt: string;
    }[];
    readonly errorMessage?: string;
  }>;
};

export const postProjectAccessAction = async (
  url: string,
  body?: Record<string, unknown>,
): Promise<{ readonly ok: boolean; readonly errorMessage?: string }> => {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  return response.json() as Promise<{
    readonly ok: boolean;
    readonly errorMessage?: string;
  }>;
};

export const fetchProjectFolderRefs = async (projectId: string) => {
  const response = await fetch(`/api/projects/${projectId}/folder-refs`, {
    cache: "no-store",
  });
  return response.json() as Promise<{
    readonly ok: boolean;
    readonly folderRefs?: readonly {
      readonly id: string;
      readonly machineOrDeviceRef: string;
      readonly folderPath: string;
    }[];
  }>;
};
