import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import ConnectThisComputerInstallBody from "@/features/home/ConnectThisComputerInstallBody";

const base = {
  description: "Run this in Terminal.",
  installCommand: "",
  onInstallEngaged: () => undefined,
};

describe("ConnectThisComputerInstallBody", () => {
  it("shows the reason instead of loading forever when minting failed", () => {
    const html = renderToStaticMarkup(
      <ConnectThisComputerInstallBody
        {...base}
        isInstallCommandLoading={false}
        installCommandError="This plan allows up to 2 computers."
      />,
    );
    expect(html).toContain("This plan allows up to 2 computers.");
    expect(html).not.toContain("preparing your install command");
  });

  it("still shows the loading line while the command is being created", () => {
    const html = renderToStaticMarkup(
      <ConnectThisComputerInstallBody
        {...base}
        isInstallCommandLoading
        installCommandError={null}
      />,
    );
    expect(html).toContain("preparing your install command");
  });
});
