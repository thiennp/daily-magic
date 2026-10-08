import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import CopyableBashCommand from "@/features/home/CopyableBashCommand";

describe("CopyableBashCommand empty command (f6e63bf4)", () => {
  it("renders no bar or Copy button when the command is empty", () => {
    expect(
      renderToStaticMarkup(<CopyableBashCommand command="  " variant="bash" />),
    ).toBe("");
  });

  it("renders the Copy button for a real command", () => {
    const html = renderToStaticMarkup(
      <CopyableBashCommand command="curl -fsSL x | bash" variant="bash" />,
    );
    expect(html).toContain("Copy install command");
    expect(html).toContain("curl -fsSL x | bash");
  });
});
