const LINK_POLL_ATTEMPTS = 45;
const LINK_POLL_MS = 2_000;

const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });

const hasClaimedDevice = async (): Promise<boolean> => {
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

const pollForClaimedDevice = async (attempt: number): Promise<boolean> => {
  if (await hasClaimedDevice()) {
    return true;
  }

  if (attempt + 1 >= LINK_POLL_ATTEMPTS) {
    return false;
  }

  await sleep(LINK_POLL_MS);
  return pollForClaimedDevice(attempt + 1);
};

export const waitForLinkedMacDevice = async (): Promise<boolean> =>
  pollForClaimedDevice(0);
