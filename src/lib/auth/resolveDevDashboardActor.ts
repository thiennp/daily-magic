import { GlobalRole } from "@/lib/auth/roles";
import type { AuthActorFromCookies } from "@/lib/auth/resolveAuthActorFromCookieHeader";

export const DEV_DASHBOARD_USER_ID = "dev-local-dashboard-user";
export const DEV_DASHBOARD_EMAIL = "dev@localhost";

export const isAgentWitchDevDashboardEnabled = (): boolean =>
  process.env.NODE_ENV !== "production" &&
  process.env.AGENT_WITCH_DEV_DASHBOARD === "1";

export const resolveDevDashboardActor = (): AuthActorFromCookies | null => {
  if (!isAgentWitchDevDashboardEnabled()) {
    return null;
  }

  return {
    id: DEV_DASHBOARD_USER_ID,
    email: DEV_DASHBOARD_EMAIL,
    globalRole: GlobalRole.SUPER_ADMIN,
    name: "Dev Local",
  };
};
