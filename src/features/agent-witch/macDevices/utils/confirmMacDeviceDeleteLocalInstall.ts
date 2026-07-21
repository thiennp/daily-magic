import { requestLocalAgentWitchDeleteInstallFromWakeServer } from "@/features/agent-witch/utils/requestLocalAgentWitchDeleteInstallFromWakeServer";

const confirmMacDeviceDeleteLocalInstall = (): void => {
  const confirmed = window.confirm(
    "Delete the local Agent Witch install on this Mac? LaunchAgents will stop and the install folder will be removed. Your cloud device entry stays until you choose Delete on the row.",
  );

  if (!confirmed) {
    return;
  }

  void requestLocalAgentWitchDeleteInstallFromWakeServer().then((result) => {
    window.alert(result.message);
  });
};

export default confirmMacDeviceDeleteLocalInstall;
