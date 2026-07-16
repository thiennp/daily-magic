export const workflowFieldInputClassName = (hasError: boolean): string =>
  hasError
    ? "mt-2 w-full rounded-lg border border-rose-500 bg-white px-3 py-2 text-sm text-gray-800 outline-none transition focus:border-rose-500 focus:ring-3 focus:ring-rose-500/10 dark:border-rose-500 dark:bg-gray-800 dark:text-white/90"
    : "mt-2 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-white/90";
