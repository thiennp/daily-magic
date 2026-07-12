import { twMerge } from "tailwind-merge";

export function mergeMarketingClasses(
  ...classes: Array<string | false | null | undefined>
): string {
  return twMerge(...classes);
}
