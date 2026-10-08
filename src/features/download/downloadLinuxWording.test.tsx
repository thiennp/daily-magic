import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import HomeConnectGuideDownloadExtras from "@/features/home/HomeConnectGuideDownloadExtras";
import { DOWNLOAD_PAGE_COPY } from "@/features/download/downloadPageCopy.constant";

const render = (operatingSystem: "mac" | "linux" | "windows") =>
  renderToStaticMarkup(
    <HomeConnectGuideDownloadExtras
      operatingSystem={operatingSystem}
      isWebSocketSupported
      showInstallCta
    />,
  );

describe("Linux wording (77c33bc5)", () => {
  it("Linux does not get the 'use your Mac' note", () => {
    expect(render("linux")).not.toContain(DOWNLOAD_PAGE_COPY.nonMacNote);
  });

  it("Windows still gets the note, which names Mac and Linux", () => {
    expect(render("windows")).toContain(DOWNLOAD_PAGE_COPY.nonMacNote);
    expect(DOWNLOAD_PAGE_COPY.nonMacNote).not.toContain("menu bar app");
  });
});
