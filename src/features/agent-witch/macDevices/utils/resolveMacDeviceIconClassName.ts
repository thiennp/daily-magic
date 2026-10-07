export const resolveMacDeviceIconClassName = (
  isOnline: boolean,
  sizeClass = "h-4 w-4 shrink-0",
): string =>
  isOnline
    ? `${sizeClass} text-success-600 dark:text-success-500`
    : `${sizeClass} text-awc-fg-muted dark:text-gray-400`;
