import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import type { ProjectMessengerMessageState } from "@/lib/projects/acl/messaging/messenger/projectMessenger.type";
import type { ProjectMessengerSubjectState } from "@/lib/projects/acl/messaging/messenger/projectMessengerWindowFields.type";

/**
 * OW9 / OW-H5 subject-state rules, codes only (no copy, no tone). The single
 * source for the server (deriveProjectMessengerSubjectState) and the One
 * window client (oneWindowSubjectState adds label + tone). Pure.
 */

/** Lower = reported first when recipients disagree (attention before progress). */
export const PROJECT_MESSENGER_SUBJECT_STATE_RANK: Readonly<
  Record<ProjectMessengerMessageState, number>
> = {
  blocked: 0,
  no_answer: 1,
  waiting: 2,
  checks_on_demand: 3,
  working: 4,
  got_it: 5,
  received: 6,
  done: 7,
};

const NEEDS_YOU_STATES: ReadonlySet<ProjectMessengerMessageState> = new Set([
  "blocked",
  "no_answer",
]);

type StateChip = { readonly state: ProjectMessengerMessageState };

/** Lead delivery chip: worst state first (stable for ties); null when none. */
export const pickProjectMessengerLeadChip = <T extends StateChip>(
  states: readonly T[],
): T | null =>
  states.length === 0
    ? null
    : [...states].sort(
        (a, b) =>
          PROJECT_MESSENGER_SUBJECT_STATE_RANK[a.state] -
          PROJECT_MESSENGER_SUBJECT_STATE_RANK[b.state],
      )[0];

/** PD delivery chips → lead state, done/of (always sent), needsYou. */
export const projectMessengerSubjectStateFromDeliveries = (
  states: readonly StateChip[],
): ProjectMessengerSubjectState | null => {
  const lead = pickProjectMessengerLeadChip(states);
  if (lead === null) return null;
  return {
    source: "deliveries",
    status: lead.state,
    done: states.filter((chip) => chip.state === "done").length,
    of: states.length,
    needsYou: NEEDS_YOU_STATES.has(lead.state),
    awaitingApproval: false,
  };
};

/** agent_runs.status is pending_approval (case / space tolerant). */
export const isProjectMessengerRunAwaitingApproval = (
  status: string,
): boolean => status.trim().toLowerCase() === AgentRunStatus.PENDING_APPROVAL;

/** AI session row: agent_runs.status; awaiting approval = needs you. */
export const projectMessengerSubjectStateFromAgentRun = (
  status: string,
): ProjectMessengerSubjectState => {
  const awaitingApproval = isProjectMessengerRunAwaitingApproval(status);
  return {
    source: "agent_run",
    status,
    needsYou: awaitingApproval,
    awaitingApproval,
  };
};
