import type { FC, SVGProps } from "react";

import type { AppIconComponent } from "@/components/ui/icon/appIconComponent.type";

export type AppIconRenderTarget =
  | { readonly kind: "component"; readonly Icon: AppIconComponent }
  | { readonly kind: "image"; readonly src: string };

const readDefaultExport = (
  icon: AppIconComponent | { readonly default: unknown },
): unknown => {
  if (typeof icon === "function") {
    return icon;
  }
  return icon.default;
};

const readImageSrc = (value: unknown): string | null => {
  if (typeof value === "string" && value.length > 0) {
    return value;
  }
  if (
    typeof value === "object" &&
    value !== null &&
    "src" in value &&
    typeof value.src === "string" &&
    value.src.length > 0
  ) {
    return value.src;
  }
  return null;
};

const unwrapIconExport = (icon: unknown): unknown => {
  let current: unknown = icon;
  for (let depth = 0; depth < 4; depth += 1) {
    if (typeof current === "function") {
      return current;
    }
    const src = readImageSrc(current);
    if (src !== null) {
      return src;
    }
    if (
      typeof current === "object" &&
      current !== null &&
      "default" in current
    ) {
      current = (current as { default: unknown }).default;
      continue;
    }
    break;
  }
  return current;
};

export const resolveAppIconRenderTarget = (
  icon: AppIconComponent | { readonly default: unknown },
): AppIconRenderTarget => {
  const resolved = unwrapIconExport(icon);
  if (typeof resolved === "function") {
    return { kind: "component", Icon: resolved as FC<SVGProps<SVGSVGElement>> };
  }
  const src = readImageSrc(resolved);
  if (src !== null) {
    return { kind: "image", src };
  }
  throw new Error("AppIcon: expected a React SVG component or image URL");
};
