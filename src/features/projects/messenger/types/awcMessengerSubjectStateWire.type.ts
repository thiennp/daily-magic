import type { ProjectMessengerSubjectState } from "@/lib/projects/acl/messaging/messenger/projectMessengerWindowFields.type";

/**
 * OW9 wire `subjectState` on a messenger timeline row (codes only).
 * Same shape as the server type, so the two cannot drift:
 * `status` is the lead delivery state, agent_runs.status, or "done"/"blocked";
 * done/of are sent for `deliveries` only. The UI maps it to label/tone
 * (OneWindowSubjectState).
 */
export type AwcMessengerSubjectStateWire = ProjectMessengerSubjectState;
