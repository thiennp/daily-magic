import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

const read = (rel: string): string =>
  readFileSync(join(process.cwd(), rel), "utf8");

describe("project access privacy: no member-bot owner identity", () => {
  it("MembershipView / PendingRequestView / briefing never carry bot owner_user_id", () => {
    const views = read("src/lib/projects/acl/buildProjectAccessViews.ts");
    const briefing = read("src/lib/projects/acl/getProjectBriefing.ts");
    const briefingText = read(
      "src/lib/projects/acl/formatProjectBriefingText.ts",
    );
    const memberRow = read(
      "src/features/projects/access/AwcProjectAccessMemberRow.tsx",
    );
    const membersList = read(
      "src/features/projects/access/AwcProjectAccessMembersList.tsx",
    );

    expect(views).toMatch(/export type MembershipView/);
    expect(views).not.toMatch(/botOwner|linkedOwner|ownerUserId/);
    expect(views).not.toContain("owner_user_id");
    expect(briefing).not.toMatch(/owner_user_id|botOwner|linkedOwner/);
    expect(briefingText).not.toMatch(/owner_user_id|botOwner|linkedOwner/);
    expect(memberRow).not.toMatch(/owner_user_id|botOwner|linkedOwner/);
    expect(membersList).not.toMatch(/owner_user_id|botOwner|linkedOwner/);
  });

  it("access GET response builder does not select agent_access_tokens.owner_user_id", () => {
    const accessRoute = read(
      "src/app/api/projects/[projectId]/access/route.ts",
    );
    expect(accessRoute).toContain("buildMembershipViews");
    expect(accessRoute).not.toContain("agent_access_tokens");
    expect(accessRoute).not.toContain("owner_user_id");
  });
});
