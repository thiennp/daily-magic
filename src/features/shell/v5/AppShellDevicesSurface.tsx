import type { ReactNode } from "react";

import {
  APP_SHELL_V5_FONT_CLASS,
  APP_SHELL_V5_SECTION_CLASS,
} from "@/features/shell/v5/appShellV5Classes.constant";

interface AppShellDevicesSurfaceProps {
  /** Inside the sidebar panel: no second card (avoid card-in-card). */
  readonly embedded: boolean;
  readonly children: ReactNode;
}

const STANDALONE_CLASS =
  "rounded-awc-card bg-awc-surface p-4 shadow-awc-card dark:bg-gray-900 dark:ring-1 dark:ring-gray-800";

export default function AppShellDevicesSurface({
  embedded,
  children,
}: AppShellDevicesSurfaceProps) {
  return (
    <section
      className={`${APP_SHELL_V5_FONT_CLASS} ${embedded ? APP_SHELL_V5_SECTION_CLASS : STANDALONE_CLASS}`}
    >
      {children}
    </section>
  );
}
