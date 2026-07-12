import { MARKETING_INPUT_FOCUS_CLASSES } from "@/features/marketing/marketingSurfaceClasses.constant";
import { mergeMarketingClasses } from "@/features/marketing/mergeMarketingClasses";

export type LoginFormAppearance = "default" | "marketing";

export const LOGIN_FORM_APPEARANCE_CLASSES: Record<
  LoginFormAppearance,
  {
    readonly description: string;
    readonly divider: string;
    readonly label: string;
    readonly input: string;
  }
> = {
  default: {
    description: "text-sm text-gray-600 dark:text-gray-400",
    divider:
      "relative py-2 text-center text-xs uppercase tracking-wide text-gray-400",
    label: "block text-sm font-medium text-gray-700 dark:text-gray-300",
    input:
      "mt-2 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 outline-none focus:border-brand-500 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-200",
  },
  marketing: {
    description: "text-sm text-slate-600",
    divider:
      "relative py-2 text-center text-xs uppercase tracking-wide text-slate-400",
    label: "block text-sm font-medium text-slate-700",
    input: mergeMarketingClasses(
      "mt-2 w-full rounded-lg border px-3 py-2.5 text-sm text-slate-800",
      MARKETING_INPUT_FOCUS_CLASSES,
    ),
  },
};
