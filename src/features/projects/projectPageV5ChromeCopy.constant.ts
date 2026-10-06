import { PROJECT_PAGE_LAYOUT_V2_COPY } from "@/features/projects/projectPageLayoutV2Copy.constant";
import { PROJECT_PAGE_SHELL_COPY } from "@/features/projects/projectPageShellCopy.constant";

/**
 * L3 V5-3 project chrome — Product EN lock (PLAN §5.2 + Product steer
 * 2026-10-06). Locked strings only; header edit reuses the v2 constant.
 */
export const PROJECT_PAGE_V5_CHROME_COPY = {
  "header.edit": PROJECT_PAGE_LAYOUT_V2_COPY.editOnThisComputer,
  "header.moreActions": "More actions",
  "header.breadcrumbAllProjects": PROJECT_PAGE_SHELL_COPY.breadcrumbAllProjects,
  "header.breadcrumbAria": "Breadcrumb",
  "status.onlineOnThisComputer": "Online on this computer",
  "status.offlineThisComputer": "This computer is offline",
  "tabs.importantCount": (n: number) => `${n} Important`,
} as const;
