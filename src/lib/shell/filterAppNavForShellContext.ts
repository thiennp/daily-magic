import type AppNavItem from "@/lib/shell/AppNavItem.type";
import {
  SHELL_NAV_ADMIN_HREF,
  SHELL_NAV_TEAM_ONLY_HREFS,
} from "@/lib/shell/shellNavTeamOnlyHrefs.constant";

export interface ShellNavFilterContext {
  readonly teamNavEnabled: boolean;
  readonly showAdminNav: boolean;
}

const isTeamOnlyNavHref = (href: string): boolean =>
  SHELL_NAV_TEAM_ONLY_HREFS.some(
    (teamHref) => href === teamHref || href.startsWith(`${teamHref}/`),
  );

const isAdminNavHref = (href: string): boolean =>
  href === SHELL_NAV_ADMIN_HREF || href.startsWith(`${SHELL_NAV_ADMIN_HREF}/`);

export const filterAppNavForShellContext = (
  items: readonly AppNavItem[],
  context: ShellNavFilterContext,
): readonly AppNavItem[] =>
  items.filter((item) => {
    if (isTeamOnlyNavHref(item.href)) {
      return context.teamNavEnabled;
    }

    if (isAdminNavHref(item.href)) {
      return context.showAdminNav;
    }

    return true;
  });
