/** Owner / inviter actions on one assistant seat. */
export const setBotRestrictionsApi = async (
  projectId: string,
  membershipId: string,
  change: { readonly isolated?: boolean; readonly closed?: boolean },
): Promise<boolean> => {
  const response = await fetch(
    `/api/projects/${projectId}/memberships/${membershipId}/isolation`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(change),
    },
  );
  return response.ok;
};

export const sendBotGuidanceApi = async (
  projectId: string,
  membershipId: string,
): Promise<boolean> => {
  const response = await fetch(
    `/api/projects/${projectId}/memberships/${membershipId}/guidance-update`,
    { method: "POST" },
  );
  return response.ok;
};
