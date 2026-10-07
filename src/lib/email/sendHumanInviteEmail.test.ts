import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const send = vi.hoisted(() => vi.fn());
const from = vi.hoisted(() => vi.fn());

vi.mock("@/lib/email/getResendClient", () => ({
  default: () => ({ emails: { send } }),
}));
vi.mock("@/lib/email/resolveEmailFrom", () => ({ default: from }));

import sendHumanInviteEmail from "@/lib/email/sendHumanInviteEmail";

const TOKEN = "SECRET-TOKEN-abcdef0123456789";
const input = {
  to: "ada@example.org",
  url: `https://www.agentwitch.com/invite/h/${TOKEN}`,
  inviterName: "Thien",
  projectName: "Moon base",
  roleLabel: "Member",
  expiresInDays: 7,
  requiresApproval: true,
};

describe("sendHumanInviteEmail (Resend, mocked)", () => {
  const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);
  const log = vi.spyOn(console, "log").mockImplementation(() => undefined);

  beforeEach(() => {
    send.mockReset();
    from.mockReturnValue("AgentWitch <noreply@agentwitch.com>");
  });
  afterEach(() => {
    warn.mockClear();
    log.mockClear();
  });

  it("sends through the existing Resend client with text + html", async () => {
    send.mockResolvedValue({ error: null });
    expect(await sendHumanInviteEmail(input)).toEqual({ ok: true });
    const payload = send.mock.calls[0][0];
    expect(payload.from).toBe("AgentWitch <noreply@agentwitch.com>");
    expect(payload.to).toBe("ada@example.org");
    expect(payload.subject).toBe(
      "Thien invited you to Moon base on AgentWitch",
    );
    expect(payload.text).toContain(input.url);
    expect(payload.html).toContain(input.url);
  });

  it("returns email_not_configured without EMAIL_FROM", async () => {
    from.mockReturnValue(undefined);
    expect(await sendHumanInviteEmail(input)).toEqual({
      ok: false,
      code: "email_not_configured",
    });
    expect(send).not.toHaveBeenCalled();
  });

  it("provider error / throw → email_send_failed; never logs token, link, or recipient", async () => {
    send.mockResolvedValueOnce({
      error: {
        name: "validation_error",
        message: `bad ${input.url} ${input.to}`,
      },
    });
    expect(await sendHumanInviteEmail(input)).toEqual({
      ok: false,
      code: "email_send_failed",
    });
    send.mockRejectedValueOnce(new Error(`network ${input.url}`));
    expect(await sendHumanInviteEmail(input)).toEqual({
      ok: false,
      code: "email_send_failed",
    });
    const logged = JSON.stringify([...warn.mock.calls, ...log.mock.calls]);
    expect(logged).not.toContain(TOKEN);
    expect(logged).not.toContain("invite/h/");
    expect(logged).not.toContain("ada@example.org");
  });
});
