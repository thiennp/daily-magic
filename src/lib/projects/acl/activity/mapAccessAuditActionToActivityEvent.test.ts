import { describe, expect, it } from "vitest";

import { mapAccessAuditActionToActivityEvent } from "@/lib/projects/acl/activity/mapAccessAuditActionToActivityEvent";
import type { WriteProjectAccessAuditInput } from "@/lib/projects/acl/writeProjectAccessAudit";

const base = { projectId: "proj-1", actorUserId: "owner-1" } as const;
const map = (input: Omit<WriteProjectAccessAuditInput, "projectId" | "actorUserId">) =>
  mapAccessAuditActionToActivityEvent({ ...base, ...input });

describe("mapAccessAuditActionToActivityEvent (adapter mapping)", () => {
  it("approve logs request.approved only for approvalSource=owner", () => {
    const detail = { requestId: "req-1", membershipId: "mem-1", projectDisplayName: "Buni" };
    const owner = map({ action: "approve", targetUserId: "bot-1", detail: { ...detail, approvalSource: "owner" } });
    expect(owner?.type).toBe("request.approved");
    expect(owner?.actor).toEqual({ kind: "owner", userId: "owner-1" });
    expect(owner?.target).toEqual({ membershipId: "mem-1", userId: "bot-1", label: "Buni" });
    expect(owner?.detail).toMatchObject({ approvalSource: "owner", requestId: "req-1" });
    for (const approvalSource of ["invite_auto_approve", "test_auto_connect", undefined]) {
      expect(map({ action: "approve", detail: { ...detail, approvalSource } })).toBeNull();
    }
  });

  it("deny keeps the requester label snapshot (F2)", () => {
    const mapped = map({ action: "deny", targetUserId: "bot-1", targetLabel: "Buni", detail: { requestId: "req-1" } });
    expect(mapped).toMatchObject({ type: "request.denied", target: { userId: "bot-1", label: "Buni" } });
  });

  it("revoke and leave carry memberKind (F5)", () => {
    const removed = map({ action: "revoke", targetUserId: "bot-1", detail: { membershipId: "mem-1", memberKind: "bot" } });
    expect(removed).toMatchObject({ type: "member.removed", actor: { kind: "owner" } });
    expect(removed?.detail).toEqual({ membershipId: "mem-1", memberKind: "bot" });
    const left = mapAccessAuditActionToActivityEvent({
      projectId: "proj-1",
      actorUserId: "bot-1",
      action: "leave",
      targetUserId: "bot-1",
      detail: { membershipId: "mem-1", memberKind: "computer" },
    });
    expect(left).toMatchObject({ type: "member.left", actor: { kind: "member", userId: "bot-1" } });
    expect(left?.detail).toEqual({ membershipId: "mem-1", memberKind: "computer" });
  });

  it("invite.create / invite.revoke carry the 8-char invite label (F3)", () => {
    const created = map({
      action: "invite.create",
      detail: { inviteId: "abcdef12-3456", maxUses: 1, autoApprove: true, platform: "grok" },
    });
    expect(created?.type).toBe("invite.created");
    expect(created?.detail).toMatchObject({ inviteId: "abcdef12-3456", label: "abcdef12", maxUses: 1 });
    const revoked = map({ action: "invite.revoke", detail: { inviteId: "abcdef12-3456" } });
    expect(revoked).toMatchObject({ type: "invite.revoked", detail: { label: "abcdef12" } });
  });

  it("S5 membership.delivery_mode maps with previousDeliveryMode (F7), kind derived by the writer", () => {
    const mapped = map({
      action: "membership.delivery_mode",
      detail: { membershipId: "mem-1", deliveryMode: "poll", activity: "You switched Buni to checks on demand" },
    });
    expect(mapped?.type).toBe("member.delivery_mode_changed");
    expect(mapped?.actor.kind).toBeUndefined();
    expect(mapped?.detail).toMatchObject({ deliveryMode: "poll", previousDeliveryMode: "webhook" });
    const system = map({
      action: "membership.delivery_mode",
      detail: { membershipId: "mem-1", deliveryMode: "webhook", trigger: "wake_link_saved" },
    });
    expect(system?.actor.kind).toBe("system");
  });

  it("ignores everything outside the Access log", () => {
    for (const action of [
      "msg.dispatch", "msg.ack", "msg.clear", "key.mint", "key.rotate", "key.revoke",
      "webhook.register", "webhook.update", "webhook.disable", "allow_claim_ok", "allow_claim_deny",
      "membership_check_ok", "membership_check_deny", "request", "invite.redeem",
      "invite.auto_approve_on", "invite.auto_approve_off", "invite.auto_approve_redeem",
      "add_folder_ref", "remove_folder_ref", "membership.set_display_name", "membership.rename_display",
    ] as const) {
      expect(map({ action, detail: { membershipId: "mem-1" } }), action).toBeNull();
    }
  });
});
