export type ProjectDeliveryModeSaveView = {
  readonly ok?: boolean;
  readonly deliveryMode?: string;
  readonly changed?: boolean;
  readonly code?: string;
  readonly errorMessage?: string;
};

/** Owner: PUT the member bot's delivery_mode (webhook | poll). */
export const saveMemberDeliveryMode = async (
  projectId: string,
  membershipId: string,
  deliveryMode: "webhook" | "poll",
): Promise<ProjectDeliveryModeSaveView> => {
  const response = await fetch(
    `/api/projects/${encodeURIComponent(projectId)}/access/members/${encodeURIComponent(membershipId)}/delivery-mode`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ deliveryMode }),
    },
  );
  return response.json() as Promise<ProjectDeliveryModeSaveView>;
};
