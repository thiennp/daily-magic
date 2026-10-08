import { isMacDeviceRowInteractiveTarget } from "@/features/agent-witch/macDevices/utils/isMacDeviceRowInteractiveTarget";

type NodeContainer = { readonly contains: (node: unknown) => boolean };

const isNodeContainer = (value: unknown): value is NodeContainer =>
  value !== null &&
  typeof value === "object" &&
  typeof (value as { contains?: unknown }).contains === "function";

/**
 * 2a281d42 (E2E 6/8): the ⋯ menu renders through a portal on document.body,
 * so React still runs the offline row's capture handler for a menu click,
 * but the clicked item is outside the row in the DOM. Only clicks really
 * on the row surface (inside it and not on its actions) open the wake modal.
 */
export const shouldOpenMacDeviceWakeModal = (
  currentTarget: EventTarget | null,
  target: EventTarget | null,
): boolean =>
  isNodeContainer(currentTarget) &&
  currentTarget.contains(target) &&
  !isMacDeviceRowInteractiveTarget(target);
