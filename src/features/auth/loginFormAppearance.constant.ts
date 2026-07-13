import { MARKETING_INPUT_BASE_CLASSES, MARKETING_INPUT_FOCUS_CLASSES } from "@/features/marketing/marketingSurfaceClasses.constant";
import {
  MARKETING_FORM_OUTLINE_BUTTON_CLASSES,
  MARKETING_FORM_PRIMARY_BUTTON_CLASSES,
} from "@/features/marketing/marketingPalette.constant";
import { mergeMarketingClasses } from "@/features/marketing/mergeMarketingClasses";

export type LoginFormAppearance = "default" | "marketing";

export const LOGIN_FORM_APPEARANCE_CLASSES: Record<
  LoginFormAppearance,
  {
    readonly divider: string;
    readonly label: string;
    readonly input: string;
    readonly googleButton: string;
    readonly submitButton: string;
  }
> = {
  default: {
    divider:
      "relative py-2 text-center text-xs uppercase tracking-wide text-gray-400",
    label: "block text-sm font-medium text-gray-700 dark:text-gray-300",
    input:
      "mt-2 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 outline-none focus:border-brand-500 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-200",
    googleButton: "",
    submitButton: "",
  },
  marketing: {
    divider:
      "relative py-2 text-center text-xs uppercase tracking-wide text-zinc-400",
    label: "block text-sm font-medium text-zinc-700",
    input: mergeMarketingClasses(
      MARKETING_INPUT_BASE_CLASSES,
      MARKETING_INPUT_FOCUS_CLASSES,
    ),
    googleButton: MARKETING_FORM_OUTLINE_BUTTON_CLASSES,
    submitButton: MARKETING_FORM_PRIMARY_BUTTON_CLASSES,
  },
};
