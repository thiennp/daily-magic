/**
 * One card look for every top-level block on a project tab: white surface,
 * 1px border, rounded, soft shadow on the grey page. Overview, Tasks and the
 * Members rail already match; Settings, Resources, Library, Reports and Safety
 * rules use these. (The project skills section copies the same classes.)
 */
export const PROJECT_PANEL_SURFACE_CLASS =
  "rounded-awc-card border border-awc-border bg-awc-surface shadow-awc-card dark:border-gray-800/80 dark:bg-gray-900/40";

/** Surface + padding: the default card. */
export const PROJECT_PANEL_CARD_CLASS = `${PROJECT_PANEL_SURFACE_CLASS} p-4`;

/** Card with an error-tinted border for destructive zones. */
export const PROJECT_PANEL_CARD_DANGER_CLASS =
  "rounded-awc-card border border-error-200 bg-awc-surface p-4 shadow-awc-card dark:border-error-900/50 dark:bg-gray-900/40";
