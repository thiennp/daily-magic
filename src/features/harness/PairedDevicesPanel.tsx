"use client";

import { useCallback, useEffect, useState } from "react";

interface PairedDevice {
  readonly id: string;
  readonly deviceLabel: string | null;
  readonly claimedAt: string;
  readonly lastSeenAt: string | null;
  readonly revokedAt: string | null;
  readonly isActive: boolean;
}

interface LoadedDevicesResult {
  readonly devices: readonly PairedDevice[];
  readonly errorMessage: string | null;
}

const formatTimestamp = (value: string | null): string => {
  if (value === null) {
    return "—";
  }

  return new Date(value).toLocaleString();
};

const fetchActiveDevices = async (): Promise<LoadedDevicesResult> => {
  try {
    const response = await fetch("/api/agent-witch/devices");
    const payload: unknown = await response.json();

    if (
      !response.ok ||
      typeof payload !== "object" ||
      payload === null ||
      !Array.isArray((payload as { devices?: unknown }).devices)
    ) {
      return {
        devices: [],
        errorMessage: "Could not load paired devices.",
      };
    }

    return {
      devices: (payload as { devices: PairedDevice[] }).devices.filter(
        (device) => device.isActive,
      ),
      errorMessage: null,
    };
  } catch {
    return {
      devices: [],
      errorMessage: "Could not load paired devices.",
    };
  }
};

export default function PairedDevicesPanel() {
  const [devices, setDevices] = useState<readonly PairedDevice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);

  const reloadDevices = useCallback(async () => {
    const result = await fetchActiveDevices();
    setDevices(result.devices);
    setMessage(result.errorMessage);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    void (async () => {
      await reloadDevices();
    })();
  }, [reloadDevices]);

  const revokeDevice = useCallback(
    async (deviceId: string) => {
      setIsLoading(true);
      setMessage(null);

      try {
        const response = await fetch(`/api/agent-witch/devices/${deviceId}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          setMessage("Could not revoke this device.");
          setIsLoading(false);
          return;
        }

        setMessage(
          "Device revoked. Re-pair after reinstalling the local agent.",
        );
        await reloadDevices();
      } catch {
        setMessage("Could not revoke this device.");
        setIsLoading(false);
      }
    },
    [reloadDevices],
  );

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-5 text-left dark:border-gray-800 dark:bg-white/[0.03]">
      <h3 className="text-sm font-semibold text-gray-800 dark:text-white/90">
        Paired devices
      </h3>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Devices linked to your account. Revoke a device if the local agent
        should stop routing harness and Claude commands to that computer.
      </p>

      {isLoading ? (
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          Loading devices…
        </p>
      ) : null}

      {!isLoading && devices.length === 0 ? (
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          No paired devices yet.
        </p>
      ) : null}

      {!isLoading && devices.length > 0 ? (
        <ul className="mt-4 space-y-3">
          {devices.map((device) => (
            <li
              key={device.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-gray-200 px-4 py-3 dark:border-gray-700"
            >
              <div>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {device.deviceLabel ?? "Local agent"}
                </p>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Paired {formatTimestamp(device.claimedAt)}
                  {device.lastSeenAt !== null
                    ? ` · Last seen ${formatTimestamp(device.lastSeenAt)}`
                    : null}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  void revokeDevice(device.id);
                }}
                className="inline-flex h-9 items-center justify-center rounded-lg border border-red-200 px-4 text-sm font-medium text-red-700 transition hover:bg-red-50 dark:border-red-900/50 dark:text-red-300 dark:hover:bg-red-950/30"
              >
                Revoke
              </button>
            </li>
          ))}
        </ul>
      ) : null}

      {message ? (
        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          {message}
        </p>
      ) : null}
    </section>
  );
}
