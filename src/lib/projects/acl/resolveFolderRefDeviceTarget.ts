/** AWL device ids are `gen_random_uuid()::text` (agent_witch_devices.id). */
const DEVICE_ID_SHAPE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export type FolderRefDeviceTarget =
  | { readonly kind: "label"; readonly ref: string }
  | { readonly kind: "device"; readonly ref: string; readonly deviceId: string }
  | { readonly kind: "invalid" };

/**
 * Pure compat rule for folder-ref writes.
 * - Explicit `deviceId` (picker) or a deviceId-shaped `machineOrDeviceRef`
 *   ⇒ "device": must be an active computer member of the project.
 * - Any other non-empty ref is a legacy free-text computer label (live Access
 *   form) ⇒ "label": stored opaque, unchanged behaviour.
 * - Empty ref, or explicit deviceId that disagrees with the ref ⇒ "invalid".
 */
export const resolveFolderRefDeviceTarget = (input: {
  readonly machineOrDeviceRef: string;
  readonly deviceId?: string | null;
}): FolderRefDeviceTarget => {
  const ref = input.machineOrDeviceRef.trim();
  const explicit = input.deviceId?.trim() ?? "";
  if (explicit.length > 0) {
    if (ref.length > 0 && ref !== explicit) {
      return { kind: "invalid" };
    }
    return { kind: "device", ref: explicit, deviceId: explicit };
  }
  if (ref.length === 0) {
    return { kind: "invalid" };
  }
  if (DEVICE_ID_SHAPE.test(ref)) {
    return { kind: "device", ref, deviceId: ref };
  }
  return { kind: "label", ref };
};
