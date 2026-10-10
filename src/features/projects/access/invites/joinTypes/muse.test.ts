import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { AWC_MUSE_HMAC_WEBHOOK_REGISTER_STEPS } from "@/lib/agentAccess/awcMuseHmacWebhookRegisterCopy.constant";
import { parseProjectInviteJoinPlatform } from "@/lib/projects/acl/invites/projectInviteJoinPlatform.constant";
import { resolveInitialProjectMembershipDeliveryMode } from "@/lib/projects/acl/resolveInitialProjectMembershipDeliveryMode";
import { buildProjectInviteJoinPage } from "@/features/projects/access/invites/joinPage/public-api/infrastructure";
import { joinType as muse } from "@/features/projects/access/invites/joinTypes/muse";

const page = buildProjectInviteJoinPage({
  token: "tok-muse-0000",
  projectId: "proj-muse",
  projectName: "Muse Project",
  autoApprove: null,
});
const museOnPage = page.types.find((t) => t.id === "muse");

describe("Muse join type", () => {
  it("is on /join types[] right after Grok Bot, labelled Muse", () => {
    expect(page.types.map((t) => t.id).slice(0, 2)).toEqual([
      "grok-bot",
      "muse",
    ]);
    expect(museOnPage?.label).toBe("Muse");
  });

  it("redeem joinType muse → platform muse: poll until a wake link, then webhook", () => {
    expect(parseProjectInviteJoinPlatform(" Muse ")).toBe("muse");
    const mode = (hasWakeLink: boolean) =>
      resolveInitialProjectMembershipDeliveryMode({
        platform: parseProjectInviteJoinPlatform("muse"),
        hasWakeLink,
      });
    expect(mode(false)).toBe("poll");
    expect(mode(true)).toBe("webhook");
    expect(muse.deliveryMode).toBe("poll");
  });

  it("points at the full Muse HMAC wake-link flow and says the mode flips on save", () => {
    const text = museOnPage?.steps.join(" ") ?? "";
    expect(text).toContain(AWC_MUSE_HMAC_WEBHOOK_REGISTER_STEPS);
    expect(text).toContain("You start in Checks on demand");
    expect(text).toContain(
      "your delivery mode switches to webhook automatically",
    );
    expect(text).toContain(
      'Call redeem_project_invite with "joinType": "muse".',
    );
  });

  it("the copy matches the code: saving a Muse wake link flips delivery_mode to webhook", () => {
    const source = readFileSync(
      join(
        process.cwd(),
        "src/lib/projects/acl/webhooks/registerProjectWebhook.ts",
      ),
      "utf8",
    );
    expect(source).toContain(
      "await flipProjectMembershipToWebhookOnWakeLink({",
    );
  });

  it("Muse's own lines say assistant, never bot", () => {
    const own = [muse.label, muse.note ?? "", ...muse.match].join(" ");
    expect(own).not.toMatch(/\bbots?\b/i);
  });
});
