import { readFileSync } from "node:fs";
import path from "node:path";

import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import AwcMessengerNoComputerHint from "@/features/projects/messenger/AwcMessengerNoComputerHint";
import { AWC_PROJECT_MESSENGER_COPY } from "@/features/projects/messenger/awcProjectMessengerCopy.constant";

const read = (rel: string) =>
  readFileSync(path.join(process.cwd(), rel), "utf8");

describe("AwcMessengerNoComputerHint", () => {
  it("renders a visible (i) note, not hover-only", () => {
    const html = renderToStaticMarkup(
      createElement(AwcMessengerNoComputerHint),
    );
    expect(html).toContain('role="note"');
    expect(html).toContain(AWC_PROJECT_MESSENGER_COPY.noComputerHintLabel);
    expect(html).toContain("Add a computer to keep a lasting copy.");
  });

  it("messenger shows it only when the project has no owner computer", () => {
    const section = read(
      "src/features/projects/messenger/AwcProjectMessengerSection.tsx",
    );
    expect(section).toContain(
      "{!hasOwnerComputer ? <AwcMessengerNoComputerHint /> : null}",
    );
    const body = read("src/features/projects/AwcProjectDetailTabPanelBody.tsx");
    expect(body).toContain(
      "hasOwnerComputer={projectHasOwnerComputer(project)}",
    );
  });
});
