import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

import {
  APP_SURFACE_PANEL_CLASS,
  APP_SURFACE_PANEL_PADDING_COMPACT_CLASS,
  APP_SURFACE_PANEL_PADDING_DEFAULT_CLASS,
} from "@/components/surfaces/appSurfaceStyles.constant";

type AppPanelProps = {
  readonly children: ReactNode;
  readonly as?: ElementType;
  readonly className?: string;
  readonly id?: string;
  readonly padding?: "default" | "compact" | "none";
  readonly embedded?: boolean;
} & Omit<ComponentPropsWithoutRef<"div">, "children" | "id" | "className">;

export default function AppPanel({
  children,
  as: Component = "section",
  className,
  id,
  padding = "default",
  embedded = false,
  ...rest
}: AppPanelProps) {
  const paddingClassName = embedded
    ? ""
    : padding === "compact"
      ? APP_SURFACE_PANEL_PADDING_COMPACT_CLASS
      : padding === "none"
        ? ""
        : APP_SURFACE_PANEL_PADDING_DEFAULT_CLASS;

  return (
    <Component
      id={id}
      className={twMerge(
        embedded ? undefined : APP_SURFACE_PANEL_CLASS,
        paddingClassName,
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}
