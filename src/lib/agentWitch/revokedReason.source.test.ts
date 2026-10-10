import fs from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

const read = (file: string): string =>
  fs.readFileSync(path.join(__dirname, file), "utf8");

describe("every device revoke records revoked_reason", () => {
  it.each([
    ["claimAgentWitchDeviceHelpers.ts", "'superseded'"],
    ["revokeAgentWitchDevice.ts", "'user_revoked'"],
    ["revokeStaleConnectPlaceholders.ts", "'placeholder_sweep'"],
    ["revokePendingInstallDevicesForUser.ts", "'placeholder_replaced'"],
    ["findAgentWitchPlaceholderByToken.ts", "'placeholder_consumed'"],
  ])("%s sets %s", (file, reason) => {
    expect(read(file)).toContain(`revoked_reason = ${reason}`);
  });
});
