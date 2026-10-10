import { readFileSync } from "node:fs";
import path from "node:path";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import AwcPendingResolvedRow from "@/features/projects/access/approvalCard/AwcPendingResolvedRow";
import {
  PENDING_RESOLVED_ANIM_MS,
  PENDING_RESOLVED_COLLAPSE_MS,
} from "@/features/projects/access/hooks/useCollapsedPendingResolved";
import { AwcHumanPendingInvitesSection } from "@/features/projects/access/humanInvites/public-api/presentation";
import AwcProjectMembersRailHeading from "@/features/projects/members/AwcProjectMembersRailHeading";
import AwcProjectMembersRailSkeleton from "@/features/projects/members/AwcProjectMembersRailSkeleton";
import { formatInviteExpiry } from "@/features/projects/members/utils/formatInviteExpiry";

const read = (relative: string): string =>
  readFileSync(
    path.join(process.cwd(), "src/features/projects", relative),
    "utf8",
  );

const personInvite = (inviteId: string) =>
  ({
    inviteId,
    status: "pending",
    role: "member",
    email: null,
    expiresAt: "2026-10-14T12:00:00.000Z",
  }) as never;

describe("DF-036 F5 counts", () => {
  it("rail header: 'Members · {n}' + '{k} waiting' pill, hidden at 0 or while loading", () => {
    const html = renderToStaticMarkup(
      createElement(AwcProjectMembersRailHeading, { count: 3, waiting: 2 }),
    );
    expect(html).toContain('data-members-count="3"');
    expect(html).toContain("members");
    expect(html).toContain(">2 waiting<");
    expect(
      renderToStaticMarkup(
        createElement(AwcProjectMembersRailHeading, { count: 3 }),
      ),
    ).not.toContain("waiting");
    expect(
      renderToStaticMarkup(
        createElement(AwcProjectMembersRailHeading, {
          count: null,
          waiting: 2,
        }),
      ),
    ).not.toContain("waiting");
  });

  it("People: badge is you + joined; waiting invites get 'Waiting · {n}' (hidden at 0)", () => {
    const people = read("access/humanInvites/AwcHumanPeopleSection.tsx");
    expect(people).toContain("count={joinedCount + 1}");
    expect(people).toContain("assistantInviteCount"); // F6
    const one = renderToStaticMarkup(
      createElement(AwcHumanPendingInvitesSection, {
        pendingInvites: [personInvite("a")],
      }),
    );
    expect(one).toContain("Waiting · 1");
    expect(
      renderToStaticMarkup(
        createElement(AwcHumanPendingInvitesSection, { pendingInvites: [] }),
      ),
    ).toBe("");
  });

  it("main chip uses the rail numbers (computer seat out, same k)", () => {
    const overview = read("overview/useOverviewPanelData.ts");
    expect(overview).toContain("countRailMembers(members)");
    expect(overview).toContain("countRailWaiting(");
    expect(read("overview/AwcProjectOverviewStatsStrip.tsx")).toContain(
      "waiting)",
    );
  });

  it("D4 expiry reads 'Oct 14'", () => {
    expect(formatInviteExpiry("2026-10-14T12:00:00.000Z", "UTC")).toBe(
      "Oct 14",
    );
    expect(formatInviteExpiry("not a date")).toBe("");
  });
});

describe("DF-036 F11 / F12", () => {
  it("resolved card shrinks (height + fade) before it unmounts; instant under reduced motion", () => {
    expect(PENDING_RESOLVED_ANIM_MS).toBeLessThan(PENDING_RESOLVED_COLLAPSE_MS);
    const props = {
      decision: "approved" as const,
      nickname: "NRG Lead",
      requester: "x",
    };
    const shrinking = renderToStaticMarkup(
      createElement(AwcPendingResolvedRow, { ...props, collapsing: true }),
    );
    expect(shrinking).toContain("grid-rows-[0fr]");
    expect(shrinking).toContain("motion-reduce:transition-none");
    expect(
      renderToStaticMarkup(createElement(AwcPendingResolvedRow, props)),
    ).toContain("grid-rows-[1fr]");
    expect(read("members/AwcProjectMembersJoinRequestsSection.tsx")).toContain(
      "onIdle={() => setStickyProjectId(null)}",
    );
  });

  it("rail shows the DF-016 skeleton (no bare 'Loading…'), pulse off under reduced motion", () => {
    const html = renderToStaticMarkup(
      createElement(AwcProjectMembersRailSkeleton),
    );
    expect(html).toContain('data-skeleton="members-rail"');
    expect(html).toContain("motion-reduce:animate-none");
    expect(html).toContain("Loading members…");
    expect(read("members/AwcProjectMembersOwnerContent.tsx")).toContain(
      "<AwcProjectMembersRailSkeleton />",
    );
  });
});
