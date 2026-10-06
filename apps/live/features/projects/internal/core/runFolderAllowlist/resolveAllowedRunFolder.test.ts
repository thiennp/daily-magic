import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { resolveAllowedRunFolder } from "./resolveAllowedRunFolder";

const root = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), "awl-allow-")));
const proj = path.join(root, "proj");
const outside = path.join(root, "outside");
const managed = path.join(root, "managed");
fs.mkdirSync(path.join(proj, "src"), { recursive: true });
fs.mkdirSync(outside);
fs.symlinkSync(outside, path.join(proj, "escape"));
fs.symlinkSync(proj, path.join(root, "proj-link"));

const base = {
  projectId: "p1",
  registeredFolders: [{ projectId: "p1", folderPath: proj }],
  managedProjectsDir: managed,
  defaultFolderPath: path.join(managed, "default"),
};

describe("resolveAllowedRunFolder", () => {
  it("allows the registered folder and returns its realpath", () => {
    expect(
      resolveAllowedRunFolder({ ...base, requestedFolderPath: path.join(root, "proj-link") }),
    ).toEqual({ ok: true, folderRealPath: proj });
  });

  it("refuses a symlink escape out of the registered folder", () => {
    expect(
      resolveAllowedRunFolder({ ...base, requestedFolderPath: path.join(proj, "escape") }),
    ).toEqual({ ok: false, code: "folder_not_registered" });
  });

  it("refuses a folder registered for another project", () => {
    expect(
      resolveAllowedRunFolder({ ...base, projectId: "p2", requestedFolderPath: proj }),
    ).toEqual({ ok: false, code: "folder_not_registered" });
  });

  it("refuses a run with no folder (computer-seat dispatch)", () => {
    expect(resolveAllowedRunFolder({ ...base, requestedFolderPath: null })).toEqual({
      ok: false,
      code: "folder_required",
    });
  });

  it("never creates a missing user folder", () => {
    const missing = path.join(root, "missing");
    const result = resolveAllowedRunFolder({
      ...base,
      registeredFolders: [{ projectId: "p1", folderPath: missing }],
      requestedFolderPath: missing,
    });
    expect(result).toEqual({ ok: false, code: "folder_not_found" });
    expect(fs.existsSync(missing)).toBe(false);
  });

  it("creates a registered AWL-managed project folder", () => {
    const folder = path.join(managed, "default");
    const result = resolveAllowedRunFolder({
      ...base,
      registeredFolders: [{ projectId: "p1", folderPath: folder }],
      requestedFolderPath: folder,
    });
    expect(result).toEqual({ ok: true, folderRealPath: folder });
  });

  it("fails closed when registrations are unavailable", () => {
    expect(
      resolveAllowedRunFolder({ ...base, registeredFolders: null, requestedFolderPath: proj }),
    ).toEqual({ ok: false, code: "folder_check_unavailable" });
  });
});
