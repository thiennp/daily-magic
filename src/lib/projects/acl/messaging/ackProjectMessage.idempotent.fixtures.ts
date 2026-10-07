type Row = Record<string, unknown>;

/** In-memory project_messages + project_message_outcomes for idempotent-ack tests. */
export const ackIdempotentState = {
  messages: new Map<string, Row>(),
  outcomes: new Map<string, Row>(),
  gate: "allow" as "allow" | "deny",
  siblingDeletesFirst: false,
  audits: 0,
  deleteCode: null as "computer_ack_required" | null,
};

export const resetAckIdempotentState = (): void => {
  ackIdempotentState.messages.clear();
  ackIdempotentState.outcomes.clear();
  ackIdempotentState.gate = "allow";
  ackIdempotentState.siblingDeletesFirst = false;
  ackIdempotentState.audits = 0;
  ackIdempotentState.deleteCode = null;
};

/** writeProjectAccessAudit stand-in: counts msg.ack audits. */
export const ackIdempotentAudit = async (): Promise<void> => {
  await Promise.resolve();
  ackIdempotentState.audits += 1;
};

export const ackIdempotentMemberships: Readonly<
  Record<string, { readonly id: string; readonly teamLabel: string | null }>
> = {
  "bot-1": { id: "mem-1", teamLabel: null },
  "bot-2": { id: "mem-2", teamLabel: null },
};

export const ackIdempotentMessage = (
  id: string,
  toUserId: string,
  toMembershipId: string,
): Row => ({
  id,
  project_id: "proj-1",
  to_user_id: toUserId,
  to_membership_id: toMembershipId,
  to_team_label: null,
  created_at: "2026-10-07T18:00:00.000Z",
  acked_at: null,
});

export const ackIdempotentSql = async (
  strings: TemplateStringsArray,
  ...values: unknown[]
): Promise<Row[]> => {
  const text = strings.join("?");
  const id = String(values[0]);
  if (text.includes("SELECT * FROM project_messages")) {
    const row = ackIdempotentState.messages.get(id);
    return row === undefined ? [] : [row];
  }
  if (text.includes("FROM project_message_outcomes")) {
    const row = ackIdempotentState.outcomes.get(id);
    return row === undefined ? [] : [row];
  }
  if (text.includes("SET acked_at = COALESCE")) {
    const row = ackIdempotentState.messages.get(id);
    if (row !== undefined && row.acked_at === null) {
      row.acked_at = "2026-10-07T19:00:00.000Z";
    }
  }
  return [];
};

/** Delete-on-ack: write the thin outcome, then the message row is gone. */
const removeWithOutcome = (messageId: string, row: Row): void => {
  ackIdempotentState.outcomes.set(messageId, {
    project_id: row.project_id,
    recipient_user_id: row.to_user_id,
    recipient_membership_id: row.to_membership_id,
  });
  ackIdempotentState.messages.delete(messageId);
};

export const ackIdempotentDeleteWithOutcome = async (input: {
  readonly messageId: string;
}): Promise<
  | { readonly ok: true; readonly messageId: string }
  | { readonly ok: false; readonly code: "not_found" | "computer_ack_required" }
> => {
  await Promise.resolve();
  if (ackIdempotentState.deleteCode !== null) {
    return { ok: false, code: ackIdempotentState.deleteCode };
  }
  const row = ackIdempotentState.messages.get(input.messageId);
  if (row === undefined) {
    return { ok: false, code: "not_found" };
  }
  removeWithOutcome(input.messageId, row);
  // Sibling concurrent wake won the race: our delete saw nothing.
  return ackIdempotentState.siblingDeletesFirst
    ? { ok: false, code: "not_found" }
    : { ok: true, messageId: input.messageId };
};
