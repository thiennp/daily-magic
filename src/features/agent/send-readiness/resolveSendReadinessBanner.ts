import { resolveMacPresenceTier } from "@/features/agent-witch/online-wake";
import { isMacWriterSendReady } from "@/features/agent-witch/online-wake/macDeviceWriterSendReady";
import { buildSendReadinessBannerFromReasonCode } from "@/features/agent/send-readiness/sendReadinessBannerCopy.constant";
import type {
  ResolveSendReadinessBannerInput,
  SendReadinessBannerModel,
  SendReadinessReasonCode,
} from "@/features/agent/send-readiness/sendReadinessBanner.types";
import { isAgentWitchInstallBundleVersionBehind } from "@/lib/agentWitch/isAgentWitchInstallBundleVersionBehind";

const resolveSelectedDevice = (
  input: ResolveSendReadinessBannerInput,
): ResolveSendReadinessBannerInput["devices"][number] | null => {
  if (input.selectedDeviceId.length === 0) {
    return input.devices[0] ?? null;
  }

  return (
    input.devices.find((device) => device.id === input.selectedDeviceId) ?? null
  );
};

const isUpdateNeededForDevice = (
  device: ResolveSendReadinessBannerInput["devices"][number],
  serverInstallBundleVersion: string | null,
): boolean => {
  const serverVersion = serverInstallBundleVersion?.trim() ?? "";
  if (serverVersion.length === 0) {
    return false;
  }

  const localVersion = device.installBundleVersion?.trim() ?? "";
  if (localVersion.length === 0) {
    return true;
  }

  return isAgentWitchInstallBundleVersionBehind(localVersion, serverVersion);
};

const resolveMacReadinessReasonCode = (
  input: ResolveSendReadinessBannerInput,
): SendReadinessReasonCode | null => {
  const device = resolveSelectedDevice(input);

  if (
    device !== null &&
    isUpdateNeededForDevice(device, input.serverInstallBundleVersion)
  ) {
    return "update_needed";
  }

  if (input.dnsUnreachable === true) {
    return "unreachable_dns";
  }

  if (device === null) {
    return input.devices.length === 0 ? "offline" : "offline";
  }

  const tier = resolveMacPresenceTier(device);

  if (tier === "offline") {
    return "offline";
  }

  if (tier === "recent") {
    return "recent";
  }

  if (tier === "live_other_instance") {
    if (input.relayState === "connecting") {
      return "live_other_instance_connecting";
    }

    return "live_other_instance_failed";
  }

  if (tier === "live" && !isMacWriterSendReady(device)) {
    return "not_dispatch_ready";
  }

  return null;
};

const isFormPromptBlocked = (
  input: ResolveSendReadinessBannerInput,
): boolean => {
  if (input.isTeamDispatch) {
    return false;
  }

  if (input.isWorkflowTask === true || input.isLibraryPlaybook === true) {
    return (input.workflowValidationErrors?.length ?? 0) > 0;
  }

  return input.formPromptEmpty === true;
};

export const resolveSendReadinessBanner = (
  input: ResolveSendReadinessBannerInput,
): SendReadinessBannerModel | null => {
  if (input.isTeamDispatch || !input.browserConnectionReady) {
    return null;
  }

  const macReason = resolveMacReadinessReasonCode(input);
  if (macReason !== null) {
    return buildSendReadinessBannerFromReasonCode(macReason);
  }

  if (isFormPromptBlocked(input)) {
    return buildSendReadinessBannerFromReasonCode("empty_prompt");
  }

  return null;
};

export const resolveSendReadinessSendDisabledReason = (
  banner: SendReadinessBannerModel | null,
): string | null => {
  if (banner === null || !banner.blocksSend) {
    return null;
  }

  return `${banner.title}. ${banner.body}`;
};
