const BTN_BASE =
  "awc-focus-ring inline-flex min-h-9 items-center justify-center gap-1.5 whitespace-nowrap rounded-awc-control px-4 py-1.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50";

export const CONNECTION_BTN = `${BTN_BASE} border border-awc-border-strong bg-awc-surface text-awc-fg hover:bg-awc-tile dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200`;

export const CONNECTION_BTN_PRIMARY = `${BTN_BASE} border border-transparent bg-brand-600 text-white hover:bg-awc-blue-700 dark:bg-brand-500`;

export const CONNECTION_BTN_SOON = `${BTN_BASE} cursor-not-allowed border border-dashed border-awc-border-strong bg-awc-tile/50 text-awc-fg-muted opacity-70 dark:border-gray-700 dark:text-gray-400`;

export const CONNECTION_BTN_DANGER = `${BTN_BASE} border border-awc-bad/40 bg-awc-surface text-awc-bad hover:bg-awc-bad-soft dark:bg-gray-800`;
