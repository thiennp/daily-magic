import type { HarnessItemKind } from "./types/HarnessItemKind.constant";
import resolveHarnessItemPath from "./resolveHarnessItemPath";

const resolveHarnessSharedItemPath = (
  itemId: string,
  kind: HarnessItemKind,
  title: string,
): string => {
  const itemPath = resolveHarnessItemPath(kind, title);
  return `shared/items/${itemId}/${itemPath}`;
};

export default resolveHarnessSharedItemPath;
