import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/features/projects/access/hooks/useThisComputerFolderTarget", () => ({
  useThisComputerFolderTarget: () => ({ kind: "unavailable" }),
}));

import AwcProjectAccessFolderRefs from "@/features/projects/access/AwcProjectAccessFolderRefs";
import AwcProjectAccessFolderRefsForm from "@/features/projects/access/AwcProjectAccessFolderRefsForm";
import {
  buildFolderRefComputerOptions,
  formatFolderRefRow,
} from "@/features/projects/access/utils/folderRefComputerOptions";
import { PROJECT_PAGE_RESOURCES_COPY as C } from "@/features/projects/resources/public-api/types";

const MEMBERS = [
  {
    memberKind: "computer",
    deviceId: "dev-1",
    projectDisplayName: "Studio Mac",
    isOnline: true,
  },
  {
    memberKind: "computer",
    deviceId: "dev-2",
    projectDisplayName: "Laptop",
    isOnline: false,
  },
  { memberKind: "computer", deviceId: null, projectDisplayName: "No id" },
  {
    memberKind: "bot",
    deviceId: "bot-1",
    projectDisplayName: "Bot",
    isOnline: true,
  },
] as const;
const OPTIONS = buildFolderRefComputerOptions(MEMBERS);

const TARGET = {
  kind: "ready",
  deviceId: "dev-1",
  deviceName: "Studio Mac",
  wakePort: 47892,
} as const;

const renderForm = (error: string | null = null) =>
  renderToStaticMarkup(
    createElement(AwcProjectAccessFolderRefsForm, {
      target: TARGET,
      error,
      folderPath: "",
      onFolderPath: () => {},
      onAdd: () => {},
    }),
  );

describe("folder refs computer picker", () => {
  it("lists computer seats by deviceId; offline stays selectable with suffix", () => {
    expect(OPTIONS).toEqual([
      { deviceId: "dev-1", deviceName: "Studio Mac", label: "Studio Mac" },
      { deviceId: "dev-2", deviceName: "Laptop", label: "Laptop · offline" },
    ]);
  });

  it("adds only on the open computer: no computer select, Browse offered", () => {
    const html = renderForm();
    expect(html).not.toContain("<select");
    expect(html).toContain("Adding on Studio Mac");
    expect(html).toContain(">Folder path");
    expect(html).toContain(C.foldersBrowse);
  });

  it("project linked device fills picker when roster has no computer seats", () => {
    const linked = buildFolderRefComputerOptions([], {
      deviceId: "linked-1",
      deviceName: "Owner Mac",
    });
    expect(linked).toEqual([
      { deviceId: "linked-1", deviceName: "Owner Mac", label: "Owner Mac" },
    ]);
    // Already in seats → no duplicate
    expect(
      buildFolderRefComputerOptions(MEMBERS, {
        deviceId: "dev-1",
        deviceName: "Studio Mac",
      }),
    ).toEqual(OPTIONS);
  });

  it("formats rows as deviceName · path, legacy raw label fallback", () => {
    const ref = { machineOrDeviceRef: "dev-2", folderPath: "~/code/x" };
    expect(formatFolderRefRow(ref, OPTIONS)).toBe("Laptop · ~/code/x");
    expect(
      formatFolderRefRow(
        { ...ref, machineOrDeviceRef: "MacBook Pro" },
        OPTIONS,
      ),
    ).toBe("MacBook Pro · ~/code/x");
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
});
