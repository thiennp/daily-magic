import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { HOME_MARKETING_AUTH_COPY } from "@/features/home/constants/homeMarketingLandingCopy.constant";
import { MAC_WORKER_BENEFIT_COPY } from "@/lib/copy/macWorkerBenefitCopy.constant";

const INSTRUCTION_TASKS_PATH = join(
  process.cwd(),
  "src/lib/agentWitch/instructions/agentWitchInstructionTasksSection.ts",
);

/** Magi Rity residuals — exact string locks after COPY-P1 / #91. */
describe("home marketing Rity copy locks", () => {
  it("auth and footer CTAs use Create free account without articles", () => {
    expect(HOME_MARKETING_AUTH_COPY.title).toBe("Create free account");
  });

  it("library helper uses New task is disabled vocab", () => {
    expect(MAC_WORKER_BENEFIT_COPY.libraryPageDescription).toContain(
      "New task is disabled",
    );
    expect(MAC_WORKER_BENEFIT_COPY.libraryPageDescription).not.toContain(
      "send is disabled",
    );
  });

  it("in-app instructions prefill from Library not Playbooks", () => {
    const source = readFileSync(INSTRUCTION_TASKS_PATH, "utf8");
    expect(source).toContain("Library or Reports");
    expect(source).not.toContain("Playbooks or Reports");
  });
});
