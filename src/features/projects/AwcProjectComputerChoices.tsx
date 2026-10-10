"use client";

import type { MyMacDevice } from "@/features/agent/hooks/public-api/types";

interface AwcProjectComputerChoicesProps {
  readonly devices: readonly MyMacDevice[];
  readonly isLoading: boolean;
  readonly selectedId: string | null;
  readonly disabled: boolean;
  readonly onSelect: (deviceId: string) => void;
}

/** Radio list of the owner's paired computers. */
export default function AwcProjectComputerChoices({
  devices,
  isLoading,
  selectedId,
  disabled,
  onSelect,
}: AwcProjectComputerChoicesProps) {
  if (devices.length === 0) {
    return (
      <p className="m-0 text-[13px] text-awc-fg-muted">
        {isLoading
          ? "Loading your computers…"
          : "No computers yet. Install AgentWitch Local on your Mac and sign in, then come back here."}
      </p>
    );
  }
  return (
    <ul className="m-0 flex list-none flex-col gap-2 p-0">
      {devices.map((device) => (
        <li key={device.id}>
          <label className="flex items-center gap-2 text-[13px] text-awc-fg">
            <input
              type="radio"
              name="attach-computer"
              checked={selectedId === device.id}
              disabled={disabled}
              onChange={() => onSelect(device.id)}
            />
            <span>
              {device.displayName ?? device.deviceLabel ?? "Computer"}
              <span className="text-awc-fg-muted">
                {" "}
                · {device.isOnline ? "online" : "offline"}
              </span>
            </span>
          </label>
        </li>
      ))}
    </ul>
  );
}
