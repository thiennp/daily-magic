import {
  MARKETING_INPUT_BASE_CLASSES,
  MARKETING_INPUT_FOCUS_CLASSES,
  MARKETING_FORM_OUTLINE_BUTTON_CLASSES,
  MARKETING_FORM_PRIMARY_BUTTON_CLASSES,
  mergeMarketingClasses,
} from "@/features/marketing/public-api/types";

export type LoginFormAppearance = "default" | "marketing";

export const LOGIN_FORM_APPEARANCE_CLASSES: Record<
  LoginFormAppearance,
  {
    readonly description: string;
    readonly divider: string;
    readonly label: string;
    readonly input: string;
    readonly googleButton: string;
    readonly submitButton: string;
  }
> = {
  default: {
    description: "text-sm text-awc-fg-muted dark:text-gray-400",
    divider:
      "relative py-2 text-center text-xs uppercase tracking-wide text-awc-fg-subtle",
    label: "block text-sm font-medium text-awc-fg dark:text-gray-300",
    input:
      "mt-2 w-full rounded-lg border border-awc-border px-3 py-2 text-sm text-awc-fg outline-none focus:border-awc-blue-600 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-200",
    googleButton: "",
    submitButton: "",
  },
  marketing: {
    description: "text-sm text-zinc-600",
    divider:
      "relative py-2 text-center text-xs uppercase tracking-wide text-zinc-600",
    label: "block text-sm font-medium text-zinc-700",
    input: mergeMarketingClasses(
      MARKETING_INPUT_BASE_CLASSES,
      MARKETING_INPUT_FOCUS_CLASSES,
    ),
    googleButton: MARKETING_FORM_OUTLINE_BUTTON_CLASSES,
    submitButton: MARKETING_FORM_PRIMARY_BUTTON_CLASSES,
  },
};
