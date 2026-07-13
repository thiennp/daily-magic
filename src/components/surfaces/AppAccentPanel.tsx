import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

import {
  APP_SURFACE_ACCENT_PANEL_CLASS,
  APP_SURFACE_PANEL_PADDING_DEFAULT_CLASS,
} from "@/components/surfaces/appSurfaceStyles.constant";

interface AppAccentPanelProps {
  readonly children: ReactNode;
  readonly className?: string;
}

export default function AppAccentPanel({
  children,
  className,
}: AppAccentPanelProps) {
  return (
    <section
      className={twMerge(
        APP_SURFACE_ACCENT_PANEL_CLASS,
        APP_SURFACE_PANEL_PADDING_DEFAULT_CLASS,
        className,
      )}
    >
      {children}
    </section>
  );
}
