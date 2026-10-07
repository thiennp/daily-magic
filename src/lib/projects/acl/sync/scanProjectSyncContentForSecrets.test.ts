import { describe, expect, it } from "vitest";

import { scanProjectSyncContentForSecrets } from "@/lib/projects/acl/sync/scanProjectSyncContentForSecrets";

describe("scanProjectSyncContentForSecrets", () => {
  it("allows plain chat JSON", () => {
    expect(
      scanProjectSyncContentForSecrets('{"summary":"hello"}').ok,
    ).toBe(true);
  });

  it("rejects private keys and sk- tokens", () => {
    expect(
      scanProjectSyncContentForSecrets("-----BEGIN PRIVATE KEY-----\nabc"),
    ).toEqual({ ok: false, code: "secret_suspect" });
    expect(
      scanProjectSyncContentForSecrets("token sk-abcdefghijklmnopqrstuvwxyz"),
    ).toEqual({ ok: false, code: "secret_suspect" });
  });
});
