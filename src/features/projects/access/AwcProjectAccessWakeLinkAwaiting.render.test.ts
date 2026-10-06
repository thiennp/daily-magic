import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

import AwcProjectAccessMemberGrokWebhookForm from "@/features/projects/access/AwcProjectAccessMemberGrokWebhookForm";
import AwcProjectAccessMembersList from "@/features/projects/access/AwcProjectAccessMembersList";
import AwcProjectAccessWakeLinkAwaitingBanner from "@/features/projects/access/AwcProjectAccessWakeLinkAwaitingBanner";

const base = {
  userId: "user-coder-0001",
  teamLabel: null,
  isAgent: true,
};

type ListProps = Parameters<typeof AwcProjectAccessMembersList>[0];

const renderList = (
  members: ListProps["members"],
  savedIds: ReadonlySet<string> = new Set(),
): string =>
  renderToStaticMarkup(
    createElement(AwcProjectAccessMembersList, {
      projectId: "proj-1",
      members,
      onRevoke: vi.fn(),
      onRename: vi.fn(async () => ({ ok: true })),
      wakeLinkSavedIds: savedIds,
    }),
  );

describe("owner awaiting-wake-link UI", () => {
  it("member row: pill + helper + 'Grok wake link' toggle while waiting", () => {
    const html = renderList([
      { ...base, id: "mem-1", projectDisplayName: "Coder", wakeLinkSet: false },
    ]);
    expect(html).toContain("Waiting for wake link");
    expect(html).toContain(
      "Coder joined. Add its Grok wake link so it can start work when the project needs it.",
    );
    expect(html).toContain(">Grok wake link<");
    expect(html).toContain('id="wake-link-mem-1"');
    expect(html).not.toContain("Wake link set");
  });

  it("member row: 'Wake link set' + 'Change wake link' once set (or saved this session)", () => {
    const fromSnapshot = renderList([
      { ...base, id: "mem-1", projectDisplayName: "Coder", wakeLinkSet: true },
    ]);
    const fromSession = renderList(
      [
        {
          ...base,
          id: "mem-1",
          projectDisplayName: "Coder",
          wakeLinkSet: false,
        },
      ],
      new Set(["mem-1"]),
    );
    for (const html of [fromSnapshot, fromSession]) {
      expect(html).toContain("Wake link set");
      expect(html).toContain(">Change wake link<");
      expect(html).not.toContain("Waiting for wake link");
      expect(html).not.toContain("joined. Add its Grok wake link");
    }
  });

  it("no wake-link pill when the snapshot has no flag (non-owner / unknown)", () => {
    const html = renderList([
      { ...base, id: "mem-1", projectDisplayName: "Coder" },
    ]);
    expect(html).not.toContain("Waiting for wake link");
    expect(html).not.toContain("Wake link set");
    expect(html).toContain(">Grok wake link<");
  });

  it("owner banner: title, body, path and 'Add wake link' per waiting bot", () => {
    const html = renderToStaticMarkup(
      createElement(AwcProjectAccessWakeLinkAwaitingBanner, {
        members: [
          { id: "mem-1", projectDisplayName: "Coder" },
          { id: "mem-2", projectDisplayName: null },
        ],
        onAddWakeLink: vi.fn(),
      }),
    );
    expect(html).toContain("Coder is waiting for a wake link");
    expect(html).toContain(
      "Without it, the project can&#x27;t wake Coder when there&#x27;s work.",
    );
    expect(html).toContain(
      "Access › People › Members › Coder › Grok wake link",
    );
    expect(html).toContain("This assistant is waiting for a wake link");
    expect(html.match(/>Add wake link</g)).toHaveLength(2);
    expect(html).not.toMatch(/webhook|hmac/i);
  });

  it("banner renders nothing when no bot is waiting", () => {
    const html = renderToStaticMarkup(
      createElement(AwcProjectAccessWakeLinkAwaitingBanner, {
        members: [],
        onAddWakeLink: vi.fn(),
      }),
    );
    expect(html).toBe("");
  });

  it("form SSR starts collapsed; the deep link expands it after mount", () => {
    const html = renderToStaticMarkup(
      createElement(AwcProjectAccessMemberGrokWebhookForm, {
        projectId: "proj-1",
        membershipId: "mem-1",
        memberName: "Coder",
        openRequest: 1,
      }),
    );
    expect(html).toContain('aria-expanded="false"');
    expect(html).not.toContain("grok-webhook-url");
  });
});
