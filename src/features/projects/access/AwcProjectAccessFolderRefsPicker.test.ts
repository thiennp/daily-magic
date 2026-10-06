import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import AwcProjectAccessFolderRefs from "@/features/projects/access/AwcProjectAccessFolderRefs";
import AwcProjectAccessFolderRefsForm from "@/features/projects/access/AwcProjectAccessFolderRefsForm";
import {
  buildFolderRefComputerOptions,
  formatFolderRefRow,
  resolveFolderRefAddError,
} from "@/features/projects/access/utils/folderRefComputerOptions";
import { PROJECT_PAGE_RESOURCES_COPY as C } from "@/features/projects/resources/projectPageResourcesCopy.constant";

const MEMBERS = [
  { memberKind: "computer", deviceId: "dev-1", projectDisplayName: "Studio Mac", isOnline: true },
  { memberKind: "computer", deviceId: "dev-2", projectDisplayName: "Laptop", isOnline: false },
  { memberKind: "computer", deviceId: null, projectDisplayName: "No id" },
  { memberKind: "bot", deviceId: "bot-1", projectDisplayName: "Bot", isOnline: true },
] as const;
const OPTIONS = buildFolderRefComputerOptions(MEMBERS);

const renderForm = (computers = OPTIONS, error: string | null = null) =>
  renderToStaticMarkup(
    createElement(AwcProjectAccessFolderRefsForm, {
      computers, error, machineRef: "", folderPath: "",
      onMachineRef: () => {}, onFolderPath: () => {}, onAdd: () => {},
    }),
  );

describe("folder refs computer picker", () => {
  it("lists computer seats by deviceId; offline stays selectable with suffix", () => {
    expect(OPTIONS).toEqual([
      { deviceId: "dev-1", deviceName: "Studio Mac", label: "Studio Mac" },
      { deviceId: "dev-2", deviceName: "Laptop", label: "Laptop · offline" },
    ]);
    const html = renderForm();
    expect(html).toContain("<select");
    expect(html).not.toMatch(/<input[^>]*e\.g\. MacBook/);
    expect(html).toMatch(/<option value=""[^>]*>Choose a computer<\/option>/);
    expect(html).toContain('<option value="dev-1">Studio Mac</option>');
    expect(html).toContain('<option value="dev-2">Laptop · offline</option>');
    expect(html).not.toContain('disabled=""');
    expect(html).toContain(">Computer");
    expect(html).toContain(">Folder path");
  });

  it("no computers: shows none copy and disables select + Add", () => {
    const html = renderForm([]);
    expect(html).toContain(C.foldersMachineNone);
    expect(html).toContain("No computers connected yet. Connect this computer first.");
    expect(html.match(/disabled=""/g)).toHaveLength(2);
  });

  it("formats rows as deviceName · path, legacy raw label fallback", () => {
    const ref = { machineOrDeviceRef: "dev-2", folderPath: "~/code/x" };
    expect(formatFolderRefRow(ref, OPTIONS)).toBe("Laptop · ~/code/x");
    expect(formatFolderRefRow({ ...ref, machineOrDeviceRef: "MacBook Pro" }, OPTIONS))
      .toBe("MacBook Pro · ~/code/x");
    const html = renderToStaticMarkup(
      createElement(AwcProjectAccessFolderRefs, {
        folderRefs: [{ id: "r1", ...ref }],
        computerMembers: MEMBERS,
        onAdd: () => true,
        onRemove: () => {},
      }),
    );
    expect(html).toContain("Laptop · ~/code/x");
    expect(html).not.toContain("→");
  });

  it("blocks Add without a chosen computer", () => {
    expect(resolveFolderRefAddError("", OPTIONS)).toBe("Choose a computer first.");
    expect(resolveFolderRefAddError("bot-1", OPTIONS)).toBe("Choose a computer first.");
    expect(resolveFolderRefAddError("dev-2", OPTIONS)).toBeNull();
    const html = renderForm(OPTIONS, "Choose a computer first.");
    expect(html).toContain('role="alert"');
    expect(html).toContain("Choose a computer first.");
  });
});
