import { describe, expect, it } from "vitest";

import { askBoxSendTargets } from "@/features/projects/askBox/askBoxSendTarget";
import { resolveAskBoxSend, type AskBoxDraft } from "@/features/projects/askBox/resolveAskBoxSend";
import type { AwcMessengerBotThread } from "@/features/projects/messenger/types/awcProjectMessenger.type";

const bot = (membershipId: string, displayName: string | null): AwcMessengerBotThread => ({
  membershipId,
  displayName,
  status: "idle",
  lastMessageAt: null,
  lastPreview: null,
  unreadCount: 0,
});

const draft = (patch: Partial<AskBoxDraft>): AskBoxDraft => ({
  text: "Check the build",
  to: "whole",
  needsReply: true,
  assignAsTask: false,
  kind: "",
  refs: { prUrl: "", commitSha: "", localPath: "", allowClaimId: "" },
  ...patch,
});

const bots = [bot("m-wake", "WB Wake"), bot("m-x", "  ")];
const targets = askBoxSendTargets(bots);

describe("ask box send targets", () => {
  it("lists All assistants first and skips unnamed assistants", () => {
    expect(targets.map((t) => t.label)).toEqual(["All assistants", "WB Wake"]);
  });

  it("task mode drops All assistants and keeps This computer chips", () => {
    expect(
      askBoxSendTargets(bots, {
        assignAsTask: true,
        computers: [{ key: "mc1", label: "This computer" }],
      }).map((t) => ({ key: t.key, label: t.label, kind: t.kind })),
    ).toEqual([
      { key: "m-wake", label: "WB Wake", kind: "assistant" },
      { key: "mc1", label: "This computer", kind: "computer" },
    ]);
  });
});

describe("resolveAskBoxSend", () => {
  it("ignores empty text", () => {
    expect(resolveAskBoxSend(draft({ text: "  " }), targets).kind).toBe("none");
  });

  it("sends a message to the whole project with needs reply on by default", () => {
    expect(resolveAskBoxSend(draft({}), targets)).toEqual({
      kind: "message",
      threadKey: "whole",
      text: "Check the build",
      needsReply: true,
      successMessage: "Sent to all assistants",
    });
  });

  it("quiet message says the assistant sees it on wake", () => {
    const plan = resolveAskBoxSend(draft({ to: "m-wake", needsReply: false }), targets);
    expect(plan).toMatchObject({ kind: "message", threadKey: "m-wake" });
    expect(plan.kind === "message" && plan.successMessage).toBe(
      "Sent. WB Wake will see it when they wake up",
    );
  });

  it("task to All assistants shows oneRecipient error (I21)", () => {
    expect(resolveAskBoxSend(draft({ assignAsTask: true }), targets)).toEqual({
      kind: "error",
      message: "A task needs one recipient. Pick one assistant or This computer.",
    });
    expect(
      resolveAskBoxSend(
        draft({ assignAsTask: true }),
        askBoxSendTargets([], { assignAsTask: true }),
      ),
    ).toEqual({
      kind: "error",
      message: "Invite an assistant first",
    });
  });

  it("task maps to inbox dispatch draft with kind + refs", () => {
    const refs = {
      prUrl: "https://example.com/pr/1",
      commitSha: "abc1234",
      localPath: "",
      allowClaimId: "",
    };
    const plan = resolveAskBoxSend(
      draft({ assignAsTask: true, to: "m-wake", kind: "review", refs }),
      targets,
    );
    expect(plan).toEqual({
      kind: "task",
      threadKey: "m-wake",
      draft: {
        assigneeMembershipId: "m-wake",
        summary: "Check the build",
        kind: "review",
        refs,
      },
      successMessage: "You assigned a task to WB Wake",
    });
  });
});
