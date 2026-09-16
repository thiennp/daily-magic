export const runMacDeviceRowMenuAction = (
  closeMenu: () => void,
  action: () => void,
): (() => void) => {
  return () => {
    closeMenu();
    action();
  };
};
