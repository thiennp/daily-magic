const INSTALL_CONNECTION_POLL_ATTEMPTS = 45;
const INSTALL_CONNECTION_POLL_MS = 2_000;

const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => {
    globalThis.setTimeout(resolve, ms);
  });

export const hasConnectedMacDevice = async (): Promise<boolean> => {
  const response = await fetch("/api/agent-witch/install-connection");
  const payload: unknown = await response.json().catch(() => null);
  if (
    !response.ok ||
    typeof payload !== "object" ||
    payload === null ||
    (payload as { ok?: unknown }).ok !== true
  ) {
    return false;
  }

  return (payload as { finished?: unknown }).finished === true;
};

/** @deprecated Prefer hasConnectedMacDevice; claimed rows alone are not install-complete. */
export const hasClaimedMacDevice = async (): Promise<boolean> => {
  const response = await fetch("/api/agent-witch/devices");
  const payload: unknown = await response.json().catch(() => null);
  if (
    !response.ok ||
    typeof payload !== "object" ||
    payload === null ||
    !Array.isArray((payload as { devices?: unknown }).devices)
  ) {
    return false;
  }

  return (payload as { devices: readonly unknown[] }).devices.length > 0;
};

const pollForConnectedDevice = async (attempt: number): Promise<boolean> => {
  if (await hasConnectedMacDevice()) {
    return true;
  }

  if (attempt + 1 >= INSTALL_CONNECTION_POLL_ATTEMPTS) {
    return false;
  }

  await sleep(INSTALL_CONNECTION_POLL_MS);
  return pollForConnectedDevice(attempt + 1);
};

export const waitForLinkedMacDevice = async (): Promise<boolean> =>
  pollForConnectedDevice(0);
