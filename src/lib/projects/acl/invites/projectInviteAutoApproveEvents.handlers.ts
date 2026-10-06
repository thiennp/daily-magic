import { inviteAutoApproveRow } from "@/lib/projects/acl/invites/projectInviteAutoApproveEvents.row";

type Stored = Record<string, unknown>;

export const handleInviteAutoApproveUpdate = (
  stored: Stored[],
  values: unknown[],
): unknown[] => {
  const next = values[0] === true;
  const id = String(values[1]);
  const projectId = String(values[2]);
  const priorIdx = stored.findIndex(
    (e) => e._kind === "invite_state" && e.id === id,
  );
  const prior =
    priorIdx >= 0
      ? (stored[priorIdx] as { auto_approve?: boolean })
      : undefined;
  if ((prior?.auto_approve === true) === next) {
    return [];
  }
  const state = { _kind: "invite_state", id, auto_approve: next };
  if (priorIdx >= 0) {
    stored[priorIdx] = state;
  } else {
    stored.push(state);
  }
  return [inviteAutoApproveRow({ id, project_id: projectId, auto_approve: next })];
};

export const handleInviteAutoApproveEventInsert = (
  stored: Stored[],
  values: unknown[],
): unknown[] => {
  stored.push({
    _kind: "event",
    id: String(values[0]),
    project_id: String(values[1]),
    invite_id: String(values[2]),
    invite_label: String(values[3]),
    event: String(values[4]),
    actor_user_id: values[5] ?? null,
    membership_id: values[6] ?? null,
    member_display_name: values[7] ?? null,
    created_at: new Date().toISOString(),
  });
  return [];
};
