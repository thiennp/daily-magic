export const formatNumber = (value: number): string =>
  new Intl.NumberFormat("en-US").format(Math.round(value));

export const fillCopy = (
  template: string,
  values: Readonly<Record<string, string | number>>,
): string =>
  Object.entries(values).reduce(
    (text, [key, value]) => text.replace(`{${key}}`, String(value)),
    template,
  );

export const MUTED_CLASS = "text-xs text-gray-500 dark:text-gray-400";
