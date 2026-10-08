import { describe, expect, it } from "vitest";

import {
  isProjectFolderTextField,
  prefillProjectFolderTextFields,
} from "@/lib/workflows/prefillProjectFolderTextFields";
import type WorkflowFieldDefinition from "@/lib/workflows/types/WorkflowFieldDefinition.type";

const appFolder: WorkflowFieldDefinition = {
  key: "app_folder",
  label: "App folder path on your computer (git repo)",
  type: "text",
  required: true,
};
const vibe: WorkflowFieldDefinition = {
  key: "vibe",
  label: "Feature vibe and outcome",
  type: "textarea",
  required: true,
};

describe("prefillProjectFolderTextFields (a9788f04)", () => {
  it("recognises a folder-path text input only", () => {
    expect(isProjectFolderTextField(appFolder)).toBe(true);
    expect(isProjectFolderTextField(vibe)).toBe(false);
    expect(
      isProjectFolderTextField({ ...appFolder, label: "Screen name" }),
    ).toBe(false);
  });

  it("fills the empty folder input from the link's project", () => {
    expect(
      prefillProjectFolderTextFields({
        fields: [appFolder, vibe],
        values: { vibe: "calm" },
        folderPath: "/home/box/qa-vibe-app",
        previousFolderPath: null,
      }),
    ).toEqual({ vibe: "calm", app_folder: "/home/box/qa-vibe-app" });
  });

  it("keeps a typed path and follows a project switch", () => {
    expect(
      prefillProjectFolderTextFields({
        fields: [appFolder],
        values: { app_folder: "/elsewhere" },
        folderPath: "/home/box/qa-vibe-app",
        previousFolderPath: null,
      }),
    ).toBeNull();
    expect(
      prefillProjectFolderTextFields({
        fields: [appFolder],
        values: { app_folder: "/home/box/old" },
        folderPath: "/home/box/new",
        previousFolderPath: "/home/box/old",
      }),
    ).toEqual({ app_folder: "/home/box/new" });
  });
});
