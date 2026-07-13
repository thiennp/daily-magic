export const APP_ICON_SIZE_CLASS = {
  xs: "size-3.5",
  sm: "size-4",
  md: "size-5",
  lg: "size-6",
  xl: "size-8",
} as const;

export type AppIconSize = keyof typeof APP_ICON_SIZE_CLASS;
