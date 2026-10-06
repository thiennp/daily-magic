import {
  qText,
  store,
} from "@/lib/agentAccess/deviceCode/deviceCodeSqlMock.store";

/** Handle UPDATE / DELETE queries for the in-memory device-code SQL mock. */
export const handleDeviceCodeSqlUpdate = (
  strings: TemplateStringsArray,
  values: readonly unknown[],
): unknown[] | null => {
  const q = qText(strings);

  if (q.includes("status = 'approved'") && q.includes("UPDATE")) {
    const target = store.requests.find((r) => r.id === values[3]);
    if (!target || target.status !== "pending") return [];
    target.status = "approved";
    target.owner_user_id = String(values[0]);
    target.token_id = String(values[1]);
    target.decided_at = String(values[2]);
    return [{ id: target.id }];
  }

  if (q.includes("status = 'denied'") && q.includes("UPDATE")) {
    const target = store.requests.find(
      (r) =>
        r.user_code_hash === values[2] &&
        r.status === "pending" &&
        Date.parse(r.expires_at) > Date.parse(String(values[3])),
    );
    if (!target) return [];
    target.status = "denied";
    target.owner_user_id = String(values[0]);
    target.decided_at = String(values[1]);
    return [{ id: target.id }];
  }

  if (q.includes("status = 'expired'") && q.includes("UPDATE")) {
    const target = store.requests.find((r) => r.id === values[0]);
    if (
      target &&
      (target.status === "pending" || target.status === "approved")
    ) {
      target.status = "expired";
    }
    return [];
  }

  if (q.includes("status = 'consumed'") && q.includes("UPDATE")) {
    const target =
      store.requests.find((r) => r.id === values[values.length - 1]) ??
      store.requests[0];
    if (target) {
      target.status = "consumed";
      target.consumed_at = String(values[0]);
      if (values.length > 2) {
        target.last_poll_at = String(values[1]);
      }
    }
    return [];
  }

  if (q.includes("slow_down_until") && q.includes("UPDATE")) {
    const target = store.requests[0];
    if (!target) return [];
    if (q.includes("slow_down_until = NULL")) {
      target.last_poll_at = String(values[0]);
      target.slow_down_until = null;
    } else if (values.length >= 2) {
      target.last_poll_at = String(values[0]);
      target.slow_down_until = String(values[1]);
    } else {
      target.last_poll_at = String(values[0]);
    }
    return [];
  }

  if (q.includes("last_poll_at") && q.includes("UPDATE") && !q.includes("consumed")) {
    const target =
      store.requests.find((r) => r.id === values[1]) ?? store.requests[0];
    if (target) target.last_poll_at = String(values[0]);
    return [];
  }

  if (q.includes("DELETE FROM agent_access_device_token_delivery")) {
    const idx = store.delivery.findIndex(
      (d) => d.device_request_id === values[0],
    );
    if (idx < 0) return [];
    const [row] = store.delivery.splice(idx, 1);
    return [row];
  }

  if (q.includes("DELETE FROM agent_access_tokens")) {
    store.tokens = store.tokens.filter((t) => t.id !== values[0]);
    return [];
  }

  if (q.includes("UPDATE users SET name")) {
    return [];
  }

  return null;
};
