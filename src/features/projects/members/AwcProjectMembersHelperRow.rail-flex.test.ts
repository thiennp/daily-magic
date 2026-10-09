import { readFileSync } from "node:fs";
import path from "node:path";

import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import AwcProjectMembersHelperWakeStatus from "@/features/projects/members/AwcProjectMembersHelperWakeStatus";
import { PROJECT_PAGE_MEMBERS_COPY as C } from "@/features/projects/projectPageMembersCopy.constant";

const read = (relative: string): string =>
  readFileSync(
    path.join(process.cwd(), "src/features/projects", relative),
    "utf8",
  );

describe("DF-036 narrow rail: assistant name vs long wake chip", () => {
  it("wake chip can shrink and truncates long labels (⋯ menu stays shrink-0)", () => {
    const wake = read("members/AwcProjectMembersHelperWakeStatus.tsx");
    expect(wake).toContain("min-w-0");
    expect(wake).toContain("truncate");
    expect(wake).not.toContain("flex shrink-0 items-center gap-1.5");
    expect(read("members/AwcProjectMembersHelperRowMoreMenu.tsx")).toContain(
      "shrink-0",
    );

    const longLabel = C.helpersWake.checks_on_demand;
    const html = renderToStaticMarkup(
      createElement(AwcProjectMembersHelperWakeStatus, {
        status: "checks_on_demand",
        onOpen: () => undefined,
      }),
    );
    expect(html).toContain(longLabel);
    expect(html).toMatch(/class="[^"]*truncate[^"]*"/);
  });

  it("row reserves name min-width; wake chip max-width truncates first", () => {
    const row = read("members/AwcProjectMembersHelperRowLabel.tsx");
    // Small reserve: a larger one let a long name overlap the wake chip in the 270px rail.
    expect(row).toContain("min-w-[4.5rem]");
    // 83a1e4d7: the name renders through AwcBotName, which truncates the text span.
    expect(row).toMatch(/<AwcBotName[^>]*font-semibold text-awc-fg/);
    expect(read("bots/AwcBotName.tsx")).toContain(
      '<span className="truncate">',
    );
    expect(read("members/AwcProjectMembersHelperWakeStatus.tsx")).toContain(
      "max-w-[35%]",
    );
  });
});
