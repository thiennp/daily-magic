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

  it("row keeps min-w-0 flex-1 on the name block beside chip + menu", () => {
    const row = read("members/AwcProjectMembersHelperRow.tsx");
    expect(row).toContain("min-w-0 flex-1");
    expect(row).toMatch(/truncate font-semibold text-awc-fg/);
  });
});
