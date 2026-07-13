import type { FC, SVGProps } from "react";
import { twMerge } from "tailwind-merge";

import {
  APP_ICON_SIZE_CLASS,
  type AppIconSize,
} from "@/components/ui/icon/appIconSize.constant";
import { APP_ICON_SVG_CLASS } from "@/components/ui/icon/appIconSvgClass.constant";

export type AppIconComponent = FC<SVGProps<SVGSVGElement>>;

interface AppIconProps {
  readonly icon: AppIconComponent;
  readonly size?: AppIconSize;
  readonly className?: string;
  readonly iconClassName?: string;
  readonly label?: string;
}

export default function AppIcon({
  icon: Icon,
  size = "md",
  className,
  iconClassName,
  label,
}: AppIconProps) {
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
      <Icon className={twMerge(APP_ICON_SVG_CLASS, iconClassName)} />
    </span>
  );
}
