import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import {
  req,
  text,
} from "@/features/projects/access/approvalCard/AwcPendingApprovalCard.fixtures";
import AwcPendingResolvedRow from "@/features/projects/access/approvalCard/AwcPendingResolvedRow";
import AwcProjectAccessPendingList from "@/features/projects/access/AwcProjectAccessPendingList";
import { AwcProjectMembersJoinRequestsSection } from "@/features/projects/members/public-api/presentation";

describe("pending join list + rail (DF-017)", () => {
  it("list prefills the requested name (requesterLabel) over the preset", () => {
    const html = renderToStaticMarkup(
      createElement(AwcProjectAccessPendingList, {
        projectId: "p1",
        pending: [{ ...req, requesterLabel: "NRG Lead" }],
        onApprove: async () => ({ ok: true }),
        onDeny: async () => true,
      }),
    );
    expect(html).toContain('value="NRG Lead"');
    expect(text(html)).toContain("This is the name it asked for.");
  });

  it("resolved rows: approved / denied, no Undo", () => {
    const ok = text(
      renderToStaticMarkup(
        createElement(AwcPendingResolvedRow, {
          decision: "approved",
          nickname: "NRG Lead",
          requester: "NRG Lead",
        }),
      ),
    );
    expect(ok).toContain("NRG Lead joined the project");
    expect(ok).toContain("It now appears under Assistants.");
    const no = renderToStaticMarkup(
      createElement(AwcPendingResolvedRow, {
        decision: "denied",
        nickname: "x",
        requester: "NRG Lead",
      }),
    );
    expect(text(no)).toContain(
      "Request from NRG Lead denied It has no access.",
    );
    expect(no).not.toContain("<button");
  });

  it("rail section: nothing when empty; expired card has no actions", () => {
    const base = {
      projectId: "p1",
      onApprove: async () => ({ ok: true }),
      onDeny: async () => true,
    };
    expect(
      renderToStaticMarkup(
        createElement(AwcProjectMembersJoinRequestsSection, {
          ...base,
          pending: [],
          expired: [],
        }),
      ),
    ).toBe("");
    const html = renderToStaticMarkup(
      createElement(AwcProjectMembersJoinRequestsSection, {
        ...base,
        pending: [],
        expired: [
          { ...req, approvalCard: { ...req.approvalCard, isExpired: true } },
        ],
      }),
    );
    const t = text(html);
    expect(t).toContain("This join request expired");
    expect(t).toContain("The assistant must start again with a new code.");
    expect(html.match(/<button/g)).toBeNull();
  });
});
