import { isProjectMessageReadOnlyRole } from "@/lib/projects/acl/messaging/decideProjectMessagePostAccess";
import {
  PROJECT_BRIEFING_HOW_TO_DISPATCH,
  PROJECT_BRIEFING_VIEWER_READ_ONLY,
} from "@/lib/projects/acl/projectBriefingHowToDispatch.constant";

/** Owner / member (bot or human) get dispatch steps; viewer gets read-only copy. */
export const selectProjectBriefingHowToDispatch = (
  role: string | null | undefined,
): string =>
  isProjectMessageReadOnlyRole(role)
    ? PROJECT_BRIEFING_VIEWER_READ_ONLY
    : PROJECT_BRIEFING_HOW_TO_DISPATCH;
