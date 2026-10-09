import { readFileSync } from "node:fs";
import path from "node:path";

import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import AwcMessengerComposer from "@/features/projects/messenger/AwcMessengerComposer";
import AwcOneWindowMentionPicker from "@/features/projects/messenger/oneWindow/AwcOneWindowMentionPicker";

const yes = async (): Promise<boolean> => true;
const noop = (): void => undefined;
const assignees = [
  { membershipId: "b1", displayName: "Scout", kind: "bot" as const },
  { membershipId: "b2", displayName: "Forge", kind: "bot" as const },
];

const composer = (list = assignees, key = "whole"): string =>
  renderToStaticMarkup(
    createElement(AwcMessengerComposer, {
      projectId: "p1",
      disabled: false,
      sending: false,
      assignees: list,
      onSendMessage: yes,
      onSendTask: yes,
      feedSwitch: { key, onSelect: noop },
    }),
  );

describe("P1-S4b @ composer", () => {
  it("@ button + hint replace Needs a reply and the Task-mode toggle", () => {
    const html = composer();
    expect(html).toContain('aria-label="Pick who gets it (@)"');
    expect(html).toContain("One assistant per message.");
    expect(html).not.toContain("Each @ assigns one task.");
    expect(html).toContain("Enter to send · Shift+Enter for a new line");
    expect(html).not.toContain("Needs a reply");
    expect(html).not.toContain("Assign task");
  });

  it("To X chip: no To everyone on the whole feed (093103ac), To {name} on a private feed", () => {
    expect(composer()).not.toContain("To everyone");
    expect(composer()).toContain(">Choose an assistant<");
    expect(composer(assignees, "b2")).toContain(">To Forge<");
  });

  it("SINGLE (one assistant): no @ button, no hint, no To chip", () => {
    const html = composer([assignees[0]]);
    expect(html).not.toContain("Pick who gets it (@)");
    expect(html).not.toContain("One assistant per message.");
    expect(html).not.toContain("Choose an assistant");
  });

  it("mention picker lists assistants, or says there is no match", () => {
    const html = renderToStaticMarkup(
      createElement(AwcOneWindowMentionPicker, {
        options: assignees,
        active: 1,
        onPick: noop,
      }),
    );
    expect(html).toContain('role="listbox"');
    expect(html).toMatch(/aria-selected="true"[^>]*>.*Forge/);
    const none = renderToStaticMarkup(
      createElement(AwcOneWindowMentionPicker, {
        options: [],
        active: 0,
        onPick: noop,
      }),
    );
    expect(none).toContain("No match in this project");
  });
});

describe("P1-S4b Members rail groups (design panel order)", () => {
  it("Pending → Assistants → People → Invite an assistant", () => {
    const src = readFileSync(
      path.join(
        process.cwd(),
        "src/features/projects/members/AwcProjectMembersOwnerContent.tsx",
      ),
      "utf8",
    );
    const order = [
      "JoinRequestsSection",
      "HelpersSection",
      "PeopleSection",
      "InviteBotsSection",
    ].map((n) => src.indexOf(`<AwcProjectMembers${n}`));
    expect(order.every((at) => at > 0)).toBe(true);
    expect([...order].sort((a, b) => a - b)).toEqual(order);
  });
});
