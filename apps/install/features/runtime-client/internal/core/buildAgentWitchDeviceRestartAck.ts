export type AgentWitchDeviceRestartAckStatus =
  | "accepted"
  | "already_in_progress"
  | "deferred_writer_busy"
  | "unsupported";

export interface AgentWitchDeviceRestartAckPayload {
  readonly status: AgentWitchDeviceRestartAckStatus;
  readonly reason: string;
  readonly message: string;
}

const MESSAGE_BY_STATUS: Record<AgentWitchDeviceRestartAckStatus, string> = {
  accepted: "Restart accepted; Local is restarting.",
  already_in_progress: "Restart already in progress.",
  deferred_writer_busy:
    "Restart deferred until the active writer task finishes.",
  unsupported:
    "This Agent Witch Local cannot handle Connect/restart. Update from /download.",
};

/**
 * Explicit Connect/restart ack so the cloud/web never sees a silent no-op from
 * a newer Local that received `device.restart`.
 */
export const buildAgentWitchDeviceRestartAckPayload = (input: {
  readonly status: AgentWitchDeviceRestartAckStatus;
  readonly reason: string;
}): AgentWitchDeviceRestartAckPayload => ({
  status: input.status,
  reason: input.reason,
  message: MESSAGE_BY_STATUS[input.status],
});
