import { linearGraphql } from "@/lib/projects/taskSync/linearGraphql";
import {
  LINEAR_BLOCKED_LABEL,
  type LinearStateType,
} from "@/lib/projects/taskSync/linearTaskMapping";

export type LinearTeam = { readonly id: string; readonly name: string };

export const listLinearTeams = async (
  token: string,
): Promise<readonly LinearTeam[]> => {
  const data = await linearGraphql<{ teams: { nodes: LinearTeam[] } }>(
    token,
    `query { teams(first: 100) { nodes { id name } } }`,
  );
  return data.teams.nodes.map((t) => ({ id: t.id, name: t.name }));
};

type StateNode = { readonly id: string; readonly type: string };
const STATES_TTL_MS = 60_000;
const statesCache = new Map<
  string,
  { readonly at: number; readonly nodes: readonly StateNode[] }
>();

/** Workflow state id of the team for a state TYPE (never by name); cached 60 s. */
export const findLinearStateId = async (
  token: string,
  teamId: string,
  type: LinearStateType,
): Promise<string | null> => {
  const hit = statesCache.get(teamId);
  const fresh = hit !== undefined && Date.now() - hit.at < STATES_TTL_MS;
  const nodes = fresh
    ? hit.nodes
    : (
        await linearGraphql<{ team: { states: { nodes: StateNode[] } } }>(
          token,
          `query($id: String!) { team(id: $id) { states { nodes { id type name } } } }`,
          { id: teamId },
        )
      ).team.states.nodes;
  if (!fresh) statesCache.set(teamId, { at: Date.now(), nodes });
  return nodes.find((s) => s.type === type)?.id ?? null;
};

/** Id of the team's "Blocked" label; created when `create` and missing. */
export const findLinearBlockedLabelId = async (
  token: string,
  teamId: string,
  create: boolean,
): Promise<string | null> => {
  const found = await linearGraphql<{
    team: { labels: { nodes: { id: string }[] } };
  }>(
    token,
    `query($id: String!, $name: String!) { team(id: $id) {
       labels(filter: { name: { eqIgnoreCase: $name } }) { nodes { id } } } }`,
    { id: teamId, name: LINEAR_BLOCKED_LABEL },
  );
  const existing = found.team.labels.nodes[0]?.id;
  if (existing !== undefined || !create) return existing ?? null;
  const made = await linearGraphql<{
    issueLabelCreate: { issueLabel: { id: string } | null };
  }>(
    token,
    `mutation($input: IssueLabelCreateInput!) {
       issueLabelCreate(input: $input) { issueLabel { id } } }`,
    { input: { name: LINEAR_BLOCKED_LABEL, teamId, color: "#e5484d" } },
  );
  return made.issueLabelCreate.issueLabel?.id ?? null;
};
