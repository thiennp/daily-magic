import { afterEach, describe, expect, it, vi } from "vitest";

import { buildAgentWitchLocalTooOldRefusalResponse } from "@/lib/agentWitch/buildAgentWitchLocalTooOldRefusalResponse";
import { fetchAgentWitchInstallConnection } from "@/lib/agentWitch/fetchAgentWitchInstallConnection";
import { parseAgentWitchLocalTooOldRefusal } from "@/lib/agentWitch/parseAgentWitchLocalTooOldRefusal";
import { AGENT_WITCH_LOCAL_TOO_OLD_REFUSAL_COPY } from "@/lib/agentWitch/agentWitchLocalTooOldRefusalCopy.constant";
import { AGENT_WITCH_LOCAL_MIN_CONNECT_BUNDLE_VERSION } from "@/lib/agentWitch/agentWitchLocalMinConnectBundleVersion.constant";

describe("AWL too-old Connect refuse (409 agent_witch_local_too_old)", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("builds the 409 contract body", async () => {
    const response = buildAgentWitchLocalTooOldRefusalResponse(null);
    expect(response.status).toBe(409);
    expect(await response.json()).toEqual({
      error: "agent_witch_local_too_old",
      installBundleVersion: null,
      minBundleVersion: AGENT_WITCH_LOCAL_MIN_CONNECT_BUNDLE_VERSION,
      downloadUrl: "/download",
      message:
        "AgentWitch Local is too old to connect. Update it, then try again.",
    });
    expect(AGENT_WITCH_LOCAL_TOO_OLD_REFUSAL_COPY.connectRefusedMessage).toBe(
      "AgentWitch Local is too old to connect. Update it, then try again.",
    );
  });

  it("parses the refuse body and ignores other errors", () => {
    expect(
      parseAgentWitchLocalTooOldRefusal({
        error: "agent_witch_local_too_old",
        installBundleVersion: "12",
        minBundleVersion: "200",
        downloadUrl: "/download",
      }),
    ).toEqual({
      error: "agent_witch_local_too_old",
      installBundleVersion: "12",
      minBundleVersion: "200",
      downloadUrl: "/download",
    });
    expect(
      parseAgentWitchLocalTooOldRefusal({
        error: "agent_witch_local_too_old",
        message: " Update it. ",
      })?.message,
    ).toBe("Update it.");
    expect(parseAgentWitchLocalTooOldRefusal({ error: "other" })).toBeNull();
    expect(parseAgentWitchLocalTooOldRefusal(null)).toBeNull();
  });

  it("never follows an off-site downloadUrl", () => {
    expect(
      parseAgentWitchLocalTooOldRefusal({
        error: "agent_witch_local_too_old",
        downloadUrl: "https://evil.example/x",
      })?.downloadUrl,
    ).toBe("/download");
    expect(
      parseAgentWitchLocalTooOldRefusal({
        error: "agent_witch_local_too_old",
        downloadUrl: "//evil.example/x",
      })?.downloadUrl,
    ).toBe("/download");
  });

  it("surfaces the refuse from install-connection instead of failing silently", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => buildAgentWitchLocalTooOldRefusalResponse("7")),
    );

    const result = await fetchAgentWitchInstallConnection();

    expect(result.ok).toBe(false);
    expect(result.tooOldRefusal).toEqual({
      error: "agent_witch_local_too_old",
      installBundleVersion: "7",
      minBundleVersion: AGENT_WITCH_LOCAL_MIN_CONNECT_BUNDLE_VERSION,
      downloadUrl: "/download",
      message: AGENT_WITCH_LOCAL_TOO_OLD_REFUSAL_COPY.connectRefusedMessage,
    });
  });
});
