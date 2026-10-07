import { describe, expect, it } from "vitest";

import { formatPlaceholderKept } from "@/features/projects/messenger/oneWindow/formatOneWindowComposerCopy";
import { ONE_WINDOW_COMPOSER_COPY } from "@/features/projects/messenger/oneWindow/oneWindowComposerCopy.constant";
import { resolveOneWindowComposerMode } from "@/features/projects/messenger/oneWindow/resolveOneWindowComposerMode";

describe("OW-H2 oneWindowComposerCopy (COMPOSER-LOCK)", () => {
  it("locks exact EN strings", () => {
    const C = ONE_WINDOW_COMPOSER_COPY;
    expect(C.pickerTitle).toBe("Who should get this?");
    expect(C.pickerEveryone).toBe("Everyone in this project");
    expect(C.pickerKeep).toBe("Keep sending to this assistant");
    expect(C.pickerKeepMany).toBe("Keep sending to these assistants");
    expect(C.pickerKeepEveryone).toBe("Keep sending to everyone");
    expect(C.chipEveryone).toBe("To everyone");
    expect(C.pickerSend).toBe("Send");
    expect(C.pickerCancel).toBe("Cancel");
    expect(C.chipLabel).toBe("To {name}");
    expect(C.chipLabelMany).toBe("To {name} and {n} more");
    expect(C.chipKeep).toBe("Keep sending");
    expect(C.keptGone).toBe(
      "{name} is no longer in this project. Pick who gets your next message.",
    );
    expect(C.placeholderEveryone).toBe(
      "Message this project. Type @ to pick who gets it.",
    );
    expect(C.placeholderKept).toBe(
      "Message {name}. Type @ to pick someone else.",
    );
    expect(C.placeholderSingle).toBe("Message {name}.");
  });

  it("kept-everyone placeholder follows COMPOSER-LOCK Message {name}.…", () => {
    expect(formatPlaceholderKept("everyone")).toBe(
      "Message everyone. Type @ to pick someone else.",
    );
  });

  it("visible copy has no MCP/OAuth/token/window_kind/bot jargon", () => {
    const blob = JSON.stringify(ONE_WINDOW_COMPOSER_COPY).toLowerCase();
    for (const bad of ["mcp", "oauth", "token", "window_kind", "bot"]) {
      expect(blob).not.toContain(bad);
    }
  });

  it("SINGLE hides routing; KEPT when sticky present; else EVERYONE", () => {
    expect(
      resolveOneWindowComposerMode({
        assistantCount: 1,
        kept: null,
        picking: true,
      }),
    ).toEqual({ mode: "SINGLE", picking: false, hideAllRoutingUi: true });
    expect(
      resolveOneWindowComposerMode({
        assistantCount: 2,
        kept: { kind: "everyone" },
        picking: false,
      }).mode,
    ).toBe("KEPT");
    expect(
      resolveOneWindowComposerMode({
        assistantCount: 2,
        kept: null,
        picking: true,
      }),
    ).toEqual({ mode: "EVERYONE", picking: true, hideAllRoutingUi: false });
  });
});
