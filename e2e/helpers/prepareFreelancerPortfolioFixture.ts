import fs from "node:fs";
import path from "node:path";
import os from "node:os";

/**
 * Copies committed portfolio fixtures into a Mac-readable path for Agent Witch.
 * Returns the absolute portfolio folder used in workflow field values.
 */
export const prepareFreelancerPortfolioFixture = (): string => {
  const repoFixtures = path.join(
    process.cwd(),
    "e2e/fixtures/freelancer-portfolio",
  );
  const targetRoot = path.join(
    os.homedir(),
    ".agent-witch/e2e-fixtures/nordlicht-studio-portfolio",
  );

  fs.mkdirSync(targetRoot, { recursive: true });

  for (const entry of fs.readdirSync(repoFixtures)) {
    if (!entry.endsWith(".md")) {
      continue;
    }
    fs.copyFileSync(
      path.join(repoFixtures, entry),
      path.join(targetRoot, entry),
    );
  }

  return targetRoot;
};

export const FREELANCER_PROPOSAL_MOCK = {
  clientName: "Nordlicht Outdoor GmbH",
  projectBrief: [
    "We are launching the FW26 Trail Softshell capsule on Shopify.",
    "Need a product detail page redesign plus a campaign landing page.",
    "Must support German and English from day one.",
    "Audience: weekend hikers in DACH who buy technical mid-layers.",
    "Must-haves: fabric story module, size guide, care instructions, trust badges,",
    "and a clean path to the waitlist form.",
    "Nice-to-have: short lookbook strip that reuses our existing photo set.",
    "Kickoff preferred week of 3 Aug 2026; soft launch late September.",
  ].join(" "),
  budgetRange: "€4,500–€6,200 all-in (two revision rounds)",
} as const;
