import {
  HARNESS_INSTALL_ITEM_KINDS,
  type HarnessInstallBundle,
  type HarnessInstallBundleItem,
  type HarnessInstallItemKind,
} from "./harnessInstallBundle.types";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const isHarnessInstallItemKind = (
  value: unknown,
): value is HarnessInstallItemKind =>
  typeof value === "string" &&
  (HARNESS_INSTALL_ITEM_KINDS as readonly string[]).includes(value);

const parseHarnessInstallBundleItem = (
  value: unknown,
): HarnessInstallBundleItem | null => {
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
    !isHarnessInstallItemKind(value.kind) ||
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
    const parsed = parseHarnessInstallBundleItem(item);
    return parsed === null ? [] : [parsed];
  });

  return {
    name,
    slug,
    items,
  };
};
