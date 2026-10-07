import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import AwcMessengerComposer from "@/features/projects/messenger/AwcMessengerComposer";
import AwcOneWindowMentionPicker from "@/features/projects/messenger/oneWindow/AwcOneWindowMentionPicker";
import type { useOneWindowComposerRouting } from "@/features/projects/messenger/oneWindow/useOneWindowComposerRouting";
import type { MessengerKeptRecipient } from "@/features/projects/messenger/types/messengerChatStore.type";

type Routing = ReturnType<typeof useOneWindowComposerRouting>;

const yes = async (): Promise<boolean> => true;
const noop = (): void => undefined;
const assignees = [
  { membershipId: "b1", displayName: "Scout", kind: "bot" as const },
  { membershipId: "b2", displayName: "Forge", kind: "bot" as const },
];

const routing = (
  kept: MessengerKeptRecipient | null,
  chipLabel: string | null,
): Routing => ({
  mode: kept === null ? "EVERYONE" : "KEPT",
  kept,
  picking: false,
  hideAllRoutingUi: false,
  placeholder: "Message this project. Type @ to pick who gets it.",
  chipLabel,
  goneName: null,
  draftForPicker: "",
  beginSendWithoutMention: () => "send",
  confirmPicker: async () => "",
  cancelPicker: noop,
  uncheckKeep: async () => undefined,
  dismissGone: noop,
});

const composer = (r: Routing, key: string | null = "whole"): string =>
  renderToStaticMarkup(
    createElement(AwcMessengerComposer, {
      disabled: false,
      sending: false,
      assignees,
      onSendMessage: yes,
      onSendTask: yes,
      routing: r,
      ...(key === null ? {} : { feedSwitch: { key, onSelect: noop } }),
    }),
  );

describe("P1-S5 Product guard: the To X switch names the send target", () => {
  it("whole feed + KEPT(Scout): only 'To Scout', no separate kept chip", () => {
    const html = composer(
      routing({ kind: "assistants", membershipIds: ["b1"] }, "To Scout"),
    );
    expect(html).toContain(">To Scout<");
    expect(html).not.toContain(">To everyone<");
    expect(html).not.toContain("Keep sending");
  });

  it("whole feed, nothing kept or everyone kept: 'To everyone'", () => {
    expect(composer(routing(null, null))).toContain(">To everyone<");
    expect(composer(routing({ kind: "everyone" }, "To everyone"))).toContain(
      ">To everyone<",
    );
  });

  it("kept many names the first and the count; private feed names its assistant", () => {
    const many = routing(
      { kind: "assistants", membershipIds: ["b1", "b2"] },
      "To Scout and 1 more",
    );
    expect(composer(many)).toContain(">To Scout and 1 more<");
    expect(composer(many, "b2")).toContain(">To Forge<");
  });

  it("without a feed switch the kept chip still shows (Keep sending)", () => {
    const html = composer(
      routing({ kind: "assistants", membershipIds: ["b1"] }, "To Scout"),
      null,
    );
    expect(html).toContain("Keep sending");
  });

  it("mention picker: assistants only, no computer copy", () => {
    const html = renderToStaticMarkup(
      createElement(AwcOneWindowMentionPicker, {
        options: assignees,
        active: 0,
        onPick: noop,
      }),
    );
    expect(html).toContain("Assistants");
    expect(html.toLowerCase()).not.toContain("computer");
  });
});
