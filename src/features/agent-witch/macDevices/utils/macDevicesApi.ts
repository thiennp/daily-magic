export const updateMacDeviceLabel = async (
  deviceId: string,
  deviceLabel: string,
): Promise<boolean> => {
  const response = await fetch(`/api/agent-witch/devices/${deviceId}/label`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ deviceLabel }),
  });

  return response.ok;
};
