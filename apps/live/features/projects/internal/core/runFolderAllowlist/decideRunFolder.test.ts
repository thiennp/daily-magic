import { describe, expect, it } from "vitest";

import { decideRunFolder } from "./decideRunFolder";

const roots = [{ lexicalPath: "/w/proj", realPath: "/real/proj" }];

describe("decideRunFolder", () => {
  it("refuses a run without a folder", () => {
    expect(
      decideRunFolder({ requestedLexicalPath: null, requestedRealPath: null, roots }),
    ).toEqual({ ok: false, code: "folder_required" });
  });

  it("fails closed when registrations could not be loaded", () => {
    expect(
      decideRunFolder({
        requestedLexicalPath: "/w/proj",
        requestedRealPath: "/real/proj",
        roots: null,
      }),
    ).toEqual({ ok: false, code: "folder_check_unavailable" });
  });

  it("allows the registered folder and its subfolders by realpath", () => {
    expect(
      decideRunFolder({
        requestedLexicalPath: "/w/proj/src",
        requestedRealPath: "/real/proj/src",
        roots,
      }),
    ).toEqual({ ok: true, folderRealPath: "/real/proj/src" });
  });

  it("refuses a symlink whose target is outside the registered folder", () => {
    expect(
      decideRunFolder({
        requestedLexicalPath: "/w/proj/link",
        requestedRealPath: "/etc",
        roots,
      }),
    ).toEqual({ ok: false, code: "folder_not_registered" });
  });

  it("says not found for a registered folder missing on disk", () => {
    expect(
      decideRunFolder({
        requestedLexicalPath: "/w/proj",
        requestedRealPath: null,
        roots: [{ lexicalPath: "/w/proj", realPath: null }],
      }),
    ).toEqual({ ok: false, code: "folder_not_found" });
  });

  it("says not registered for an unknown missing folder", () => {
    expect(
      decideRunFolder({
        requestedLexicalPath: "/tmp/other",
        requestedRealPath: null,
        roots,
      }),
    ).toEqual({ ok: false, code: "folder_not_registered" });
  });
});
