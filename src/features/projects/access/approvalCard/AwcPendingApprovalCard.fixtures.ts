import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import AwcProjectAccessPendingRow from "@/features/projects/access/AwcProjectAccessPendingRow";

/** Shared fixtures for the DF-017 pending join card render tests. */
export const text = (html: string): string =>
  html
    .replace(/<[^>]+>/g, " ")
    .replaceAll("&#x27;", "'")
    .replaceAll("&quot;", '"')
    .replace(/\s+/g, " ");

export const req = {
  id: "r1",
  requesterUserId: "bot-1",
  reason: null,
  createdAt: "2026-10-06T09:00:00.000Z",
  requesterIsAgent: true,
  requesterLabel: "Scout",
  suggestedProjectDisplayName: null,
  approvalCard: {
    assistantKind: "Claude",
    ownerClaimed: true,
    ownerPersonName: "Thien",
    connectVia: "device_code" as const,
    expectedDeliveryMode: "poll" as const,
    modeKnown: true,
    isExpired: false,
  },
};
export const noop = () => undefined;
export const row = (over: Partial<Parameters<typeof AwcProjectAccessPendingRow>[0]> = {}) =>
  renderToStaticMarkup(
    createElement(AwcProjectAccessPendingRow, {
      req,
      nameValue: "Scout",
      error: null,
      available: [],
      onNameChange: noop,
      onApprove: noop,
      onDeny: noop,
      ...over,
    }),
  );
