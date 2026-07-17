export const isMacDeviceRowInteractiveTarget = (
  target: EventTarget | null,
): boolean => {
  if (
    target === null ||
    typeof (target as { closest?: unknown }).closest !== "function"
  ) {
    return false;
  }

  return (
    (target as Element).closest(
      "[data-mac-device-row-actions], input, textarea, select, a",
    ) !== null
  );
};
