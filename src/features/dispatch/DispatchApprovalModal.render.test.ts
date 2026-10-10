import { createElement, type ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/features/dispatch/hooks/public-api/presentation", () => ({
  useNowMsEvery: () => Date.parse("2026-10-06T14:00:00.000Z"),
}));

// Soft HOLD portal Modal returns null under renderToStaticMarkup (canPortal +
// createPortal). Stub Modal so this card-copy unit test still sees children.
vi.mock("@/components/ui/modal", () => ({
  Modal: ({ children }: { children: ReactNode }) => children,
}));

import DispatchApprovalModal from "@/features/dispatch/DispatchApprovalModal";
import { DISPATCH_APPROVAL_CARD_COPY as C } from "@/features/dispatch/dispatchApprovalCardCopy.constant";
import { AWC_PENDING_APPROVAL_CARD_COPY } from "@/features/projects/access/approvalCard/awcPendingApprovalCardCopy.constant";

const base = {
  runId: "r1",
  requesterEmail: "Sam",
  prompt: "Fix it",
  approvalExpiresAt: "2026-10-06T14:10:00.000Z",
  tool: null as string | null,
  computerName: null as string | null,
  projectFolder: null as string | null,
};

const render = (overrides: Partial<typeof base> = {}): string =>
  renderToStaticMarkup(
    createElement(DispatchApprovalModal, {
      request: { ...base, ...overrides },
      onApprove: () => undefined,
      onDeny: () => undefined,
      onDismiss: () => undefined,
    }),
  ).replaceAll("&#x27;", "'");

describe("DispatchApprovalModal richer card", () => {
  it("keeps the S0-2 title and body when tool/computer are missing", () => {
    const html = render();
    expect(html).toContain(C.title);
    expect(html).toContain("Sam wants to start a task on your computer.");
    expect(html).toContain(AWC_PENDING_APPROVAL_CARD_COPY.approve);
    expect(html).toContain(AWC_PENDING_APPROVAL_CARD_COPY.deny);
  });

  it("upgrades title and shows folder when rich fields are present", () => {
    const html = render({
      tool: "claude-cli",
      computerName: "Studio Mac",
      projectFolder: "/Users/me/app",
    });
    expect(html).toContain("Sam wants claude-cli to run a task on Studio Mac");
    expect(html).toContain("Folder: /Users/me/app");
    expect(html).not.toContain(C.title);
    expect(html).toContain("This request ends in");
  });
});
