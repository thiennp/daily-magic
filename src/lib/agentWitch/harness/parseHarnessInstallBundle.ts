import { HARNESS_ITEM_KINDS } from "./types/HarnessItemKind.constant";
import type { HarnessItemKind } from "./types/HarnessItemKind.constant";
import type HarnessInstallBundle from "./types/HarnessInstallBundle.type";
import type HarnessItemWriteSpec from "./types/HarnessItemWriteSpec.type";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const isHarnessItemKind = (value: unknown): value is HarnessItemKind =>
  typeof value === "string" &&
  (HARNESS_ITEM_KINDS as readonly string[]).includes(value);

const parseHarnessItemWriteSpec = (
  value: unknown,
): HarnessItemWriteSpec | null => {
  if (!isRecord(value)) {
    return null;
  }

  const setSlugs = value.setSlugs;
  const normalizedSetSlugs = Array.isArray(setSlugs)
    ? setSlugs.flatMap((slug) =>
        typeof slug === "string" && slug.trim().length > 0 ? [slug.trim()] : [],
      )
    : [];

  if (
    typeof value.id !== "string" ||
    value.id.trim().length === 0 ||
    !isHarnessItemKind(value.kind) ||
    typeof value.title !== "string" ||
    value.title.trim().length === 0 ||
    typeof value.content !== "string" ||
    normalizedSetSlugs.length === 0
  ) {
    return null;
  }

  return {
    id: value.id.trim(),
    kind: value.kind,
    title: value.title.trim(),
    content: value.content,
    setSlugs: normalizedSetSlugs,
  };
};

export const parseHarnessInstallBundle = (
  value: unknown,
): HarnessInstallBundle | null => {
  if (!isRecord(value)) {
    return null;
  }

  const name = typeof value.name === "string" ? value.name.trim() : "";
  const slug = typeof value.slug === "string" ? value.slug.trim() : "";
  const rawItems = Array.isArray(value.items) ? value.items : [];

  if (name.length === 0 || slug.length === 0) {
    return null;
  }

  const items = rawItems.flatMap((item) => {
    const parsed = parseHarnessItemWriteSpec(item);
    return parsed === null ? [] : [parsed];
  });

  return {
    name,
    slug,
    items,
  };
};
