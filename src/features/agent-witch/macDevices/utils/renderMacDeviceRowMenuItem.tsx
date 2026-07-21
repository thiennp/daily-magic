import type { ReactElement } from "react";

import { DropdownItem } from "@/components/ui/dropdown/DropdownItem";

const menuItemClassName = (danger: boolean): string =>
  danger
    ? "flex w-full items-center gap-2 px-3 py-2 text-sm text-error-600 hover:bg-error-50 dark:text-error-400 dark:hover:bg-error-500/10"
    : "flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/5";

export const renderMacDeviceRowMenuItem = (
  onClick: () => void,
  icon: ReactElement,
  label: string,
  danger = false,
): ReactElement => (
  <li>
    <DropdownItem onClick={onClick} baseClassName={menuItemClassName(danger)}>
      {icon}
      <span>{label}</span>
    </DropdownItem>
  </li>
);
