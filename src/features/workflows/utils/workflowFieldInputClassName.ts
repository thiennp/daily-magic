export const workflowFieldInputClassName = (hasError: boolean): string =>
  hasError
    ? "mt-2 w-full rounded-lg border border-rose-500 bg-white px-3 py-2 text-sm text-awc-fg outline-none transition focus:border-rose-500 focus:ring-3 focus:ring-rose-500/10 dark:border-rose-500 dark:bg-gray-800 dark:text-white/90"
    : "mt-2 w-full rounded-lg border border-awc-border bg-white px-3 py-2 text-sm text-awc-fg dark:border-gray-700 dark:bg-gray-800 dark:text-white/90";
