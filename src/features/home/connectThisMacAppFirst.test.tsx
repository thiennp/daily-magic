import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import ConnectThisMacAppFirst from "@/features/home/ConnectThisMacAppFirst";

const render = (): string =>
  renderToStaticMarkup(
    <ConnectThisMacAppFirst
      downloadUrl="https://example.test/AgentWitchLocal.dmg"
      terminalBody={<p>INSTALL-COMMAND-BLOCK</p>}
    />,
  );

describe("ConnectThisMacAppFirst", () => {
  it("leads with the app download and keeps the command collapsed", () => {
    const html = render();
    expect(html).toContain("No Terminal needed");
    expect(html).toContain("https://example.test/AgentWitchLocal.dmg");
    expect(html).toContain("choose Reconnect");
    expect(html).not.toContain("INSTALL-COMMAND-BLOCK");
  });
});
