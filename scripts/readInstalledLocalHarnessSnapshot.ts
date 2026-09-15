import fs from "node:fs";

import type { AgentWitchLocalLayout } from "./resolveAgentWitchLocalLayout";

export type InstalledLocalHarnessSetSummary = {
  readonly slug: string;
  readonly name: string;
  readonly itemCount: number;
  readonly updatedAt: string;
};

export type InstalledLocalHarnessSnapshot = {
  readonly manifestUpdatedAt: string | null;
  readonly sets: readonly InstalledLocalHarnessSetSummary[];
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

export const readInstalledLocalHarnessSnapshot = (
  layout: AgentWitchLocalLayout,
): InstalledLocalHarnessSnapshot => {
  if (!fs.existsSync(layout.harnessManifestPath)) {
    return { manifestUpdatedAt: null, sets: [] };
  }

  try {
    const parsed: unknown = JSON.parse(
      fs.readFileSync(layout.harnessManifestPath, "utf8"),
    );
    if (!isRecord(parsed) || parsed.version !== 1) {
      return { manifestUpdatedAt: null, sets: [] };
    }

    const manifestUpdatedAt =
      typeof parsed.updatedAt === "string" ? parsed.updatedAt : null;
    const setsRecord = isRecord(parsed.sets) ? parsed.sets : {};
    const sets = Object.entries(setsRecord)
      .map(([slugKey, setValue]) => {
        if (!isRecord(setValue)) {
          return null;
        }
        const slug =
          typeof setValue.slug === "string" && setValue.slug.length > 0
            ? setValue.slug
            : slugKey;
        const name =
          typeof setValue.name === "string" && setValue.name.length > 0
            ? setValue.name
            : slug;
        const updatedAt =
          typeof setValue.updatedAt === "string" ? setValue.updatedAt : "";
        const items = Array.isArray(setValue.items) ? setValue.items : [];

        return {
          slug,
          name,
          itemCount: items.length,
          updatedAt,
        };
      })
      .filter(
        (entry): entry is InstalledLocalHarnessSetSummary => entry !== null,
      )
      .toSorted((left, right) => left.name.localeCompare(right.name));

    return { manifestUpdatedAt, sets };
  } catch {
    return { manifestUpdatedAt: null, sets: [] };
  }
};
