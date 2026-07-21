export const CURSOR_CLOUD_EXECUTOR_DEVICE_ID = "__cursor_cloud__";

export const isCursorCloudExecutorDeviceId = (deviceId: string): boolean =>
  deviceId === CURSOR_CLOUD_EXECUTOR_DEVICE_ID;
