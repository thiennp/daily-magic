import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { AWC_PROJECT_INBOX_COPY } from "@/features/projects/access/inbox/awcProjectInboxCopy.constant";
import {
  AWC_PROJECT_OWNER_MESSAGE_DISPLAY_NAME,
  formatProjectMessageNewFrom,
  formatProjectMessageSending,
  PROJECT_MESSAGE_RECEIVED_STARTED_PROCESSING,
} from "@/features/projects/access/inbox/awcProjectMessageStatusCopy.constant";
import { resolveProjectMessageClientStatus } from "@/features/projects/access/inbox/utils/resolveProjectMessageClientStatus";

const readSrc = (relativePath: string): string =>
  readFileSync(join(process.cwd(), relativePath), "utf8");

describe("project message status copy", () => {
  it("formats the four separate states and leaves ack as done", () => {
    expect(formatProjectMessageSending("Ada")).toBe("Ada is sending a message");
    expect(formatProjectMessageNewFrom("Ada")).toBe("New message from Ada.");
    expect(PROJECT_MESSAGE_RECEIVED_STARTED_PROCESSING).toBe(
      "Received. Started processing.",
    );
    expect(AWC_PROJECT_INBOX_COPY.ackedLabel).toBe("Acked");
    expect(AWC_PROJECT_INBOX_COPY.ackedLabel).not.toMatch(/Received|processing/i);
    expect(formatProjectMessageNewFrom("Ada")).not.toMatch(/processing|Received/i);
  });

  it("wires in-flight and dispatch-accepted only, never ack or processing", () => {
    expect(
      resolveProjectMessageClientStatus({
        phase: "in_flight",
        senderDisplayName: AWC_PROJECT_OWNER_MESSAGE_DISPLAY_NAME,
      }),
    ).toBe("Owner is sending a message");
    expect(
      resolveProjectMessageClientStatus({
        phase: "dispatch_accepted",
        senderDisplayName: "Ada",
      }),
    ).toBe("New message from Ada.");
    const resolver = readSrc(
      "src/features/projects/access/inbox/utils/resolveProjectMessageClientStatus.ts",
    );
    expect(resolver).not.toContain("ackedAt");
    expect(resolver).not.toContain("PROJECT_MESSAGE_RECEIVED_STARTED_PROCESSING");
    expect(resolver).not.toContain("Received. Started processing.");
  });

  it("keeps the message list ack control and does not render started-processing", () => {
    const list = readSrc(
      "src/features/projects/access/inbox/AwcProjectInboxMessageList.tsx",
    );
    const hook = readSrc(
      "src/features/projects/access/inbox/hooks/useAwcProjectInboxDispatchClientSend.ts",
    );
    const form = readSrc(
      "src/features/projects/access/inbox/AwcProjectInboxDispatchForm.tsx",
    );
    expect(list).toContain("ackedLabel");
    expect(list).toContain("unackedLabel");
    expect(list).not.toContain("Received. Started processing.");
    expect(hook).toContain("resolveProjectMessageClientStatus");
    expect(hook).toContain('phase: "in_flight"');
    expect(hook).toContain('phase: "dispatch_accepted"');
    expect(hook).not.toContain("Received. Started processing.");
    expect(hook).not.toContain("ackedAt");
    expect(form).toContain("markInFlight");
    expect(form).toContain("markAccepted");
    expect(form).not.toContain("Received. Started processing.");
  });
});
