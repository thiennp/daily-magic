import { beforeEach, describe, expect, it, vi } from "vitest";

import { writeProjectActivityEvent } from "@/lib/projects/acl/activity/writeProjectActivityEvent";
import { writeProjectAccessAudit } from "@/lib/projects/acl/writeProjectAccessAudit";

vi.mock("@/lib/projects/acl/activity/writeProjectActivityEvent", () => ({
  writeProjectActivityEvent: vi.fn(async () => undefined),
}));

const writer = vi.mocked(writeProjectActivityEvent);

describe("writeProjectAccessAudit adapter", () => {
  beforeEach(() => writer.mockClear());

  it("forwards allowed actions to the Access log writer", async () => {
    await writeProjectAccessAudit({
      projectId: "proj-1",
      actorUserId: "bot-1",
      action: "leave",
      targetUserId: "bot-1",
      detail: { membershipId: "mem-1", memberKind: "bot" },
    });
    expect(writer).toHaveBeenCalledTimes(1);
    expect(writer.mock.calls[0]?.[0]).toMatchObject({ type: "member.left" });
  });

  it("ignores msg.* / key.* / webhook.* and claim/check actions", async () => {
    for (const action of ["msg.dispatch", "key.mint", "webhook.disable", "membership_check_ok"] as const) {
      await writeProjectAccessAudit({ projectId: "proj-1", actorUserId: "bot-1", action });
    }
    expect(writer).not.toHaveBeenCalled();
  });
});
