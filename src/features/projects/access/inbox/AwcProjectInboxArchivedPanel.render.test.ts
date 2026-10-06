import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import AwcProjectInboxArchivedPanel from "@/features/projects/access/inbox/AwcProjectInboxArchivedPanel";
import type AwcProjectInboxMessage from "@/features/projects/access/inbox/types/awcProjectInboxMessage.type";

const row: AwcProjectInboxMessage = {
  messageId: "m1",
  kind: "task.assign",
  summary: "archived hello",
  refs: {},
  fromProjectDisplayName: "AliceBot",
  fromMembershipId: "mem-a",
  toProjectDisplayName: "BobBot",
  toMembershipId: "mem-b",
  toUserId: null,
  toTeamLabel: null,
  createdAt: "2026-10-06T09:00:00.000Z",
  ackedAt: null,
};

const render = (canRestore: boolean, messages = [row]): string =>
  renderToStaticMarkup(
    createElement(AwcProjectInboxArchivedPanel, {
      messages,
      canRestore,
      restoring: false,
      onRestoreOne: () => undefined,
      onRequestRestoreAll: () => undefined,
    }),
  ).replaceAll("&#x27;", "'");

const buttons = (html: string): string[] =>
  [...html.matchAll(/<button[^>]*>([^<]*)<\/button>/g)].map((m) => m[0]);

describe("AwcProjectInboxArchivedPanel owner restore", () => {
  it("owner: Restore + Restore all enabled, no reason line", () => {
    const html = render(true);
    expect(html).toContain("archived hello");
    expect(html).not.toContain("Only the project owner can restore messages.");
    buttons(html).forEach((b) => expect(b).not.toContain("disabled"));
  });

  it("non-owner: archived still readable; Restore disabled with the reason", () => {
    const html = render(false);
    expect(html).toContain("archived hello");
    expect(html).toContain(">Only the project owner can restore messages.<");
    const all = buttons(html);
    expect(all.length).toBe(2);
    all.forEach((b) => expect(b).toContain("disabled"));
  });

  it("empty archive shows the LOCK empty line", () => {
    expect(render(true, [])).toContain(">Nothing archived.<");
  });
});
