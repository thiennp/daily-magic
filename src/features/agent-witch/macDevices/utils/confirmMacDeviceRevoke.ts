const confirmMacDeviceRevoke = (
  displayName: string,
  deviceId: string,
  onDelete: (deviceId: string) => void | Promise<void>,
): void => {
  const confirmed = window.confirm(
    `Remove "${displayName}" from your account? You can connect this computer again after reinstalling AgentWitch.`,
  );

  if (!confirmed) {
    return;
  }

  void onDelete(deviceId);
};

export default confirmMacDeviceRevoke;
