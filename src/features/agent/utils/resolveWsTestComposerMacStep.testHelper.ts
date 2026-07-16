import type { WsTestComposerMacStepInput } from "@/features/agent/utils/resolveWsTestComposerMacStep";

export const wsTestComposerMacStepBaseInput: WsTestComposerMacStepInput = {
  showMacPicker: true,
  isOwnDeviceDispatch: false,
  isMacDeviceLocked: false,
  isMacDevicesLoading: false,
  deviceCount: 2,
};
