import { twMerge } from "tailwind-merge";

import {
  APP_ICON_SIZE_CLASS,
  type AppIconSize,
} from "@/components/ui/icon/appIconSize.constant";
import type { AppIconComponent } from "@/components/ui/icon/appIconComponent.type";
import { APP_ICON_SVG_CLASS } from "@/components/ui/icon/appIconSvgClass.constant";
import { resolveAppIconRenderTarget } from "@/components/ui/icon/resolveAppIconRenderTarget";

export type { AppIconComponent } from "@/components/ui/icon/appIconComponent.type";

interface AppIconProps {
  readonly icon: AppIconComponent | { readonly default: unknown };
  readonly size?: AppIconSize;
  readonly className?: string;
  readonly iconClassName?: string;
  readonly label?: string;
}

export default function AppIcon({
  icon,
  size = "md",
  className,
  iconClassName,
  label,
}: AppIconProps) {
  const target = resolveAppIconRenderTarget(icon);
  const isDecorative = label === undefined;

  return (
    <span
      className={twMerge(
        "inline-flex shrink-0 items-center justify-center overflow-visible",
        APP_ICON_SIZE_CLASS[size],
        className,
      )}
      aria-hidden={isDecorative ? true : undefined}
      aria-label={label}
      role={isDecorative ? undefined : "img"}
    >
      {target.kind === "component" ? (
        <target.Icon className={twMerge(APP_ICON_SVG_CLASS, iconClassName)} />
      ) : (
        <img
          src={target.src}
          alt=""
          className={twMerge(APP_ICON_SVG_CLASS, iconClassName)}
        />
      )}
    </span>
  );
}
