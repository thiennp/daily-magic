import { describe, expect, it } from "vitest";

import {
  AWC_GROK_WAKE_AWAITING_COPY,
  formatAwcGrokWakeCopy,
} from "@/features/projects/access/awcGrokWakeAwaitingCopy.constant";
import {
  awcGrokWakeLinkHash,
  buildAwcGrokWakeLinkHref,
  parseAwcGrokWakeLinkHash,
} from "@/features/projects/access/awcGrokWakeLinkDeepLink";
import { AWC_GROK_WEBHOOK_FORM_COPY } from "@/features/projects/access/awcGrokWebhookFormCopy.constant";
import { isProjectPageTabId } from "@/features/projects/projectPageTabs.constant";
import {
  listMembersAwaitingWakeLink,
  resolveMemberWakeLinkState,
} from "@/features/projects/access/utils/resolveMemberWakeLinkState";

describe("Grok wake-link deep link", () => {
  it("builds /projects/<id>#wake-link-<membershipId> and parses it back", () => {
    const href = buildAwcGrokWakeLinkHref("proj 1", "mem/1");
    expect(href).toBe("/projects/proj%201#wake-link-mem%2F1");
    expect(parseAwcGrokWakeLinkHash(href.slice(href.indexOf("#")))).toBe(
      "mem/1",
    );
    expect(parseAwcGrokWakeLinkHash(awcGrokWakeLinkHash("abc"))).toBe("abc");
  });

  it("ignores other hashes and never collides with a project tab id", () => {
    expect(parseAwcGrokWakeLinkHash("#activity")).toBeNull();
    expect(parseAwcGrokWakeLinkHash("#wake-link-")).toBeNull();
    expect(parseAwcGrokWakeLinkHash("#wake-link-%E0%A4%A")).toBeNull();
    expect(isProjectPageTabId(awcGrokWakeLinkHash("mem-1"))).toBe(false);
  });
});

describe("awaiting wake link copy", () => {
  it("keeps the Invite path label and Product EN", () => {
    const copy = AWC_GROK_WAKE_AWAITING_COPY;
    expect(copy.formTitle).toBe(AWC_GROK_WEBHOOK_FORM_COPY.toggle);
    expect(copy.formTitle).toBe("Grok wake link");
    expect(formatAwcGrokWakeCopy(copy.path, "Coder")).toBe(
      "Access › People › Members › Coder › Grok wake link",
    );
    expect(formatAwcGrokWakeCopy(copy.bannerBody, "Coder")).toBe(
      "Without it, the project can't wake Coder when there's work.",
    );
    expect(formatAwcGrokWakeCopy(copy.formHelp, "Coder")).toBe(
      "Paste the wake link and key from Coder's routine in Grok Bot.",
    );
  });

  it("falls back to 'this assistant' and capitalises at sentence start", () => {
    expect(
      formatAwcGrokWakeCopy(AWC_GROK_WAKE_AWAITING_COPY.bannerTitle, null),
    ).toBe("This assistant is waiting for a wake link");
    expect(
      formatAwcGrokWakeCopy(AWC_GROK_WAKE_AWAITING_COPY.bannerBody, " "),
    ).toBe(
      "Without it, the project can't wake this assistant when there's work.",
    );
  });

  it("visible owner copy never says webhook, HMAC or API", () => {
    for (const value of Object.values(AWC_GROK_WAKE_AWAITING_COPY)) {
      expect(value).not.toMatch(/webhook|hmac|\bapi\b/i);
    }
  });
});

describe("resolveMemberWakeLinkState", () => {
  const bot = { id: "m1", isAgent: true, wakeLinkSet: false };
  it("awaiting until set; session save wins; absent flag = no pill", () => {
    expect(resolveMemberWakeLinkState(bot)).toBe("awaiting");
    expect(resolveMemberWakeLinkState({ ...bot, wakeLinkSet: true })).toBe(
      "wakes",
    );
    expect(resolveMemberWakeLinkState(bot, new Set(["m1"]))).toBe("wakes");
    expect(resolveMemberWakeLinkState({ id: "m2", isAgent: true })).toBeNull();
    expect(
      resolveMemberWakeLinkState({
        id: "h",
        isAgent: false,
        wakeLinkSet: false,
      }),
    ).toBeNull();
    expect(
      listMembersAwaitingWakeLink([
        bot,
        { ...bot, id: "m3", wakeLinkSet: true },
      ]),
    ).toEqual([bot]);
  });
});
