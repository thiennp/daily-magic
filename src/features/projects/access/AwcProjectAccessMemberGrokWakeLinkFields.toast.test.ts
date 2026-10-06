import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

import AwcProjectAccessMemberGrokWakeLinkFields from "@/features/projects/access/AwcProjectAccessMemberGrokWakeLinkFields";
import type { useMemberGrokWebhookForm } from "@/features/projects/access/hooks/useMemberGrokWebhookForm";

type Form = ReturnType<typeof useMemberGrokWebhookForm>;

const render = (deliveryModeFlipped: boolean) =>
  renderToStaticMarkup(
    createElement(AwcProjectAccessMemberGrokWakeLinkFields, {
      memberName: "Coder",
      form: {
        saving: false,
        saved: true,
        error: null,
        webhookUrl: "",
        webhookKey: "",
        setWebhookUrl: vi.fn(),
        setWebhookKey: vi.fn(),
        save: vi.fn(),
        status: {
          ok: true,
          grokWebhookRegistered: true,
          grokWebhookUrlHost: "example.test",
          deliveryModeFlipped,
        },
      } as unknown as Form,
    }),
  );

describe("wake-link saved toast", () => {
  it("auto-flip replaces the whole toast", () => {
    const html = render(true);
    expect(html).toContain(
      "Wake link saved. Coder now wakes up on its own when the project needs it.",
    );
    expect(html).not.toContain("will now wake up when the project needs it");
    expect(html).not.toContain("It now wakes up on its own.");
  });

  it("no flip keeps the plain saved toast", () => {
    const html = render(false);
    expect(html).toContain(
      "Wake link saved. Coder will now wake up when the project needs it.",
    );
    expect(html).not.toContain("now wakes up on its own");
  });
});
