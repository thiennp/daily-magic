import { describe, expect, it } from "vitest";

import { buildProjectInviteJoinAccessCheckStep } from "@/features/projects/access/invites/buildProjectInviteJoinAccessCheckStep";
import { buildProjectInviteJoinBriefingPeersStep } from "@/features/projects/access/invites/buildProjectInviteJoinBriefingPeersStep";
import { buildProjectInviteJoinConnectStep } from "@/features/projects/access/invites/buildProjectInviteJoinConnectStep";
import { buildProjectInviteJoinDispatchStep } from "@/features/projects/access/invites/buildProjectInviteJoinDispatchStep";
import { buildProjectInviteJoinLeaveStep } from "@/features/projects/access/invites/buildProjectInviteJoinLeaveStep";
import { buildProjectInviteJoinProjectLine } from "@/features/projects/access/invites/buildProjectInviteJoinProjectLine";
import { buildProjectInviteJoinRedeemStep } from "@/features/projects/access/invites/buildProjectInviteJoinRedeemStep";
import { resolveProjectInviteJoinToken } from "@/features/projects/access/invites/resolveProjectInviteJoinToken";
import { buildAgentAccessUrls } from "@/lib/agentAccess/buildAgentAccessUrls";

const HINT = "proj-xyz";

describe("join steps with input", () => {
  it("connect step uses the passed agent-access URLs", () => {
    const urls = buildAgentAccessUrls();
    const text = buildProjectInviteJoinConnectStep({ urls }).join("\n");
    expect(text.startsWith("1. ")).toBe(true);
    expect(text).toContain(urls.mcpUrl);
    expect(text).toContain(urls.registerUrl);
    expect(text).toContain("acceptTerms");
    expect(text).toContain("termsVersion");
    expect(text).toContain(
      "Show your user the Terms (https://www.agentwitch.com/terms) and Privacy Policy (https://www.agentwitch.com/privacy) and get a clear yes before you register. Joining accepts both. Then send acceptTerms: true and termsVersion in the register body.",
    );
    expect(text).not.toContain("your human");
  });

  it("redeem step embeds the token in the JSON", () => {
    const lines = buildProjectInviteJoinRedeemStep({ token: "tok-1" });
    expect(lines[0]?.startsWith("2. ")).toBe(true);
    expect(lines[1]).toBe(
      '   { "token": "tok-1", "suggestedProjectDisplayName": "<unique nickname>" }',
    );
  });

  it.each([
    ["3. ", buildProjectInviteJoinAccessCheckStep],
    ["4. ", buildProjectInviteJoinBriefingPeersStep],
    ["6. ", buildProjectInviteJoinDispatchStep],
    ["8. ", buildProjectInviteJoinLeaveStep],
  ] as const)(
    "step %s interpolates projectIdHint and is pure",
    (prefix, step) => {
      const first = step({ projectIdHint: HINT });
      expect(first[0]?.startsWith(prefix)).toBe(true);
      expect(first.join("\n")).toContain(`"projectId": "${HINT}"`);
      expect(step({ projectIdHint: HINT })).toEqual(first);
    },
  );

  it("dispatch step teaches visible messenger reply", () => {
    const text = buildProjectInviteJoinDispatchStep({ projectIdHint: HINT }).join(
      "\n",
    );
    expect(text).toContain("project_messenger_reply");
    expect(text).toContain('"inReplyTo": "<messageId>"');
    expect(text).toContain("never stop there alone");
    expect(text).toContain("task.status");
    expect(text).toContain("task.done");
  });

  it("token and project line helpers", () => {
    expect(
      resolveProjectInviteJoinToken({ inviteUrl: "x", token: "  t  " }),
    ).toBe("t");
    expect(
      buildProjectInviteJoinProjectLine({ projectId: "p", projectName: " N " }),
    ).toBe("Project: N (p)");
    expect(buildProjectInviteJoinProjectLine({})).toBeNull();
  });
});
